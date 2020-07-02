GTC_DIFF_TOOLING_VERSION = '1.2'

# Check whether two normalized test center rows refer to the same test center
def check_test_center_match(row1, row2):
    ident_flags = []
    warn_flags = []

    row1_formatted_address_obj = row1['formatted_address_obj']
    row2_formatted_address_obj = row2['formatted_address_obj']

    #if row1['name'] == row2['name']:
    #    ident_flags.append('NAME_MATCH')
    
    if(row1_formatted_address_obj['google_place_id'] == row2_formatted_address_obj['google_place_id']):
        ident_flags.append('GOOG_PLACEID_MATCH')

    if(row1_formatted_address_obj['formatted_address'] == row2_formatted_address_obj['formatted_address']):
        ident_flags.append('FORMATTED_ADDR_MATCH')

    if(check_test_centers_near(row1_formatted_address_obj, row2_formatted_address_obj)):
        warn_flags.append('CLOSE_GEO_RANGE')
    
    return ident_flags, warn_flags
    
# This is rough math, may need to revise due to Python's round() behavior
# Want to return test centers within 100 meters   
def check_test_centers_near(row1_formatted_address_obj, row2_formatted_address_obj):
    row1_lat = round(row1_formatted_address_obj['lat_lng']['lat'], 3)
    row1_lng = round(row1_formatted_address_obj['lat_lng']['lng'], 3)

    row2_lat = round(row2_formatted_address_obj['lat_lng']['lat'], 3)
    row2_lng = round(row2_formatted_address_obj['lat_lng']['lng'], 3)

    if(row1_lat == row2_lat and row1_lng == row2_lng):
        return True
    
    return False

# Currently only examines a few key fields
def extract_proposed_row_updates(old_row, new_row):
    proposed_updates = {}

    props = [
        'appointment_required', 
        'doctor_screen_required_beforehand', 
        'drive_thru_site',
        'physician_referral_required',
        'verified_by_phone_external_party',
        'hours_of_operation'
    ]
    for prop in props:
        if(old_row[prop] == None and new_row[prop] != None):
            proposed_updates[prop] = new_row[prop]
    
    return proposed_updates

def check_row_against_ver_unver(staged_row, unverified_rows, verified_rows, merge_fill_blanks):
    staged_row['matches'] = []
    staged_row['review_similar'] = []

    for unverified_row in unverified_rows:
        ident_flags, warn_flags = check_test_center_match(staged_row, unverified_row)

        if(len(ident_flags) > 0):
            match_obj = {
                'ident_flags': ident_flags, 
                'type': 'UNVERIFIED',
                'google_place_id': unverified_row['google_place_id']
            }
            if(merge_fill_blanks):
                match_obj['proposed_updates'] = extract_proposed_row_updates(unverified_row, staged_row)

            staged_row['matches'].append(match_obj)
        if(len(warn_flags) > 0 and len(ident_flags) == 0):
            staged_row['review_similar'].append({'warn_flags': warn_flags, 'type': 'UNVERIFIED', 'unverified_row_id': unverified_row['id'] })
    
    for verified_row in verified_rows:
        ident_flags, warn_flags = check_test_center_match(staged_row, verified_row)

        if(len(ident_flags) > 0):
            staged_row['matches'].append({'ident_flags': ident_flags, 'type': 'VERIFIED', 'verified_row_id': verified_row['id'] })
        if(len(warn_flags) > 0 and len(ident_flags) == 0):
            staged_row['matches'].append({'warn_flags': warn_flags, 'type': 'VERIFIED', 'verified_row_id': verified_row['id'] })
    
    return staged_row

def format_row_to_unverified_schema(row):
    row['staging_row_id'] = row['id']
    row['google_place_id'] = row['formatted_address_obj']['google_place_id']

    del row['formatted_address_obj']
    del row['matches']
    del row['id']
    del row['geolocation']
    del row['createdAt']
    del row['updatedAt']

    return row

def format_unmatched_rows_to_unverified_schema(rows):
    formatted_rows = map(format_row_to_unverified_schema, rows)
    return list(formatted_rows)

def get_row_match_results(rows):
    ver_unver_match_count = 0
    unverified_match_count = 0
    verified_match_count = 0
    unmatched_rows = []

    for row in rows:
        unver_count = 0
        ver_count = 0

        for match in row['matches']:
            if match['type'] == 'VERIFIED':
                ver_count = ver_count + 1
            elif match['type'] == 'UNVERIFIED':
                unver_count = unver_count + 1
        
        if unver_count > 0 and ver_count > 0:
            ver_unver_match_count = ver_unver_match_count + 1
        elif unver_count > 0:
            unverified_match_count = unverified_match_count + 1
        elif ver_count > 0:
            verified_match_count = verified_match_count + 1
        else:
            unmatched_rows.append(row)
    
    return ver_unver_match_count, unverified_match_count, verified_match_count, unmatched_rows

def get_similar_rows_with_review_recommended(rows):
    similar_rows_for_manual_review = []

    for row in rows:
        for sim in row['review_similar']:
            similar_rows_for_manual_review.append(row)
    
    return similar_rows_for_manual_review

def get_mapping_stats(mapped_rows):
    ver_unver_match_count, unverified_match_count, verified_match_count, unmatched_rows = get_row_match_results(mapped_rows)
    similar_rows_for_manual_review = get_similar_rows_with_review_recommended(mapped_rows)

    return { 
        'ver_unver_match_count': ver_unver_match_count, 
        'unverified_match_count': unverified_match_count, 
        'verified_match_count': verified_match_count, 
        'unmatched_rows': unmatched_rows,
        'unmatched_row_count': len(unmatched_rows),
        'similar_rows_not_added_but_review_recommended': similar_rows_for_manual_review
    }

def group_staging_rows(staging_rows):
    staging_row_groups = {}
    for row in staging_rows:
        google_place_id = row['formatted_address_obj']['google_place_id']
        if google_place_id in staging_row_groups:
            staging_row_groups[google_place_id].append(row)
        else:
            staging_row_groups[google_place_id] = [row]
    
    # For any duplicate staging rows, our selection of which row to use for matching is arbitrary
    deduplicated_staging_rows = []
    for row_group in staging_row_groups.values():
        deduplicated_staging_rows.append(row_group[0])

    return staging_row_groups, deduplicated_staging_rows

def generate_deletion_diff_obj(google_place_ids):
    dump_obj = {
        'diff_tooling_version': GTC_DIFF_TOOLING_VERSION,
        'google_place_ids_for_deletion': google_place_ids
    }
    
    return dump_obj

def generate_unverified_update_diff_obj(staging_test_centers, unverified_test_centers, verified_test_centers, merge_fill_blanks):
    grouped_staging_row_dict, deduplicated_staging_rows = group_staging_rows(staging_test_centers)

    #simple brute force for visibility/traceability
    processed_rows = [check_row_against_ver_unver(staged_row, unverified_test_centers, verified_test_centers, merge_fill_blanks) for staged_row in deduplicated_staging_rows]
    stats = get_mapping_stats(processed_rows)
    stats['unmatched_rows'] = format_unmatched_rows_to_unverified_schema(stats['unmatched_rows'])

    dump_obj = {
        'diff_tooling_version': GTC_DIFF_TOOLING_VERSION,
        'staging_row_deduplication_groups': grouped_staging_row_dict,
        'staging_row_deduplicated_count': len(deduplicated_staging_rows),
        'post_processing_stats': stats,
        'processed_rows': processed_rows
    }
    
    return dump_obj