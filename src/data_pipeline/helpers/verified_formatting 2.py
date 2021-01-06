
# WIP
def generate_verified_obj_from_hubspot_record(hubspot_obj):
    test_center_remove_flag = hubspot_obj['Test Center Should Be Removed - Not Real']

    hubspot_company_id = hubspot_obj['Company ID']
    external_id = hubspot_obj['External ID']

    latest_verification_at = hubspot_obj['Last Modified Date']
    # Should be: Verified Test Center
    verification_status = hubspot_obj['Review Status']
    
    name = hubspot_obj['Name']
    address = hubspot_obj['Test Center Address']
    city = hubspot_obj['City']
    zip_code = hubspot_obj['Zip Code']
    phone_number = hubspot_obj['Phone Number - Primary']
    url = hubspot_obj['Test Center Website']
    description = hubspot_obj['Test Center Description']
    
    phys_ref_flag = hubspot_obj['Physician Referral  Required']
    drive_thru_flag = hubspot_obj['Drive-thru Test Center']
    doc_screen_flag = hubspot_obj['Doctor Screening']
    app_req_flag = hubspot_obj['Appointment Required']
