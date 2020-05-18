
import googlemaps
import re
import os

gmaps = googlemaps.Client(key=os.getenv("GOOGLE_API_KEY"))

def get_formatted_address(full_address):
    if(full_address == None):
        full_address = ''
        
    geocode_result = gmaps.geocode(full_address)
                
    if(len(geocode_result) > 0):
        primary_result = geocode_result[0]
        formatted_address = primary_result['formatted_address']
        lat_lng = primary_result['geometry']['location']
        google_place_id = primary_result['place_id']
        
        #NOTE: We attempted to use google's 'vicinity' for a shortened address, but it doesn't work as advertised.
        #places_data = gmaps.place(google_place_id)
        #print('vicinity: ', places_data['vicinity'])
        
        return {'formatted_address': formatted_address, 'lat_lng': lat_lng, 'google_place_id': google_place_id}
    else:
        return None

# Returns empty string if phone is invalid
def get_formatted_phone(phone_field):
    if(phone_field == None):
        phone_field = ''
        
    contains_phone = re.search("^([1]?[\s]?[\-]?[\s]?)([\(]?[\s]?[0-9]{3}[\s]?[\)]?[\s]?[\-]{0,1}[\s]?[0-9]{3}[\s]?[\-]{0,1}[\s]?([0-9]{4}|[A-Z]{4})[\s]?[\-]{0,1}[\s]?)((ext|Ext|EXT)[\s]?[.]?[\s]?[0-9]{1,2})?", phone_field)
    
    clean_phone_digits = ""
    if(contains_phone):
        
        clean_phone_digits = re.sub("\D", "", contains_phone.group(2))
        clean_phone_digits = '({}){} {}'.format(clean_phone_digits[0:3], clean_phone_digits[3:6], clean_phone_digits[6:])
        if(contains_phone.group(4)):
            ext_segment = 'Ext {}'.format(re.sub("\D", "", contains_phone.group(4)))
            clean_phone_digits = '{} {}'.format(clean_phone_digits, ext_segment)
        
    return clean_phone_digits

def is_likely_drive_thru(description_field):
    if(description_field == None):
        description_field = ''
        
    drive_thru_flag = re.search('(curbside|drive thru|drive-by|drive by|drive-up|drive up|drive\-thru|inside your car|in the car|in car)|(wait in [a-zA-Z]{0,} car)|(remain in [a-zA-Z]{0,} vehicle)', description_field.lower())
    if(drive_thru_flag != None):
        return True
    return False
            
def is_likely_appointment_required(description_field):
    if(description_field == None):
        description_field = ''
        
    appt_flag = re.search('appointment|appt|schedule|pre-registration', description_field.lower())
    if(appt_flag != None):
        return True
    return False

def is_likely_screen_required(description_field):
    if(description_field == None):
        description_field = ''
        
    screen_flag = re.search('screen|referral|referred|referal|medical order|order from a medical provider|pre-registration|qualify|call in advance|call ahead|calling ahead|call to be approved|call first|doctor\'s order|call ([a-z\']{1,14}\s?){0,5} (prior|before)|required ([a-z\']{1,14}\s?){0,5} virtual visits|online assessment|if your doctor|need telemedicine appointment|must receive guidance', description_field.lower())
    if(screen_flag != None):
        return True
    return False

# A very minimal check to weed-out obvious junk
def is_valid_URL(description_field = ""):
    if(description_field == None):
        description_field = ''
        
    url_flag = re.search('^(http|www)', description_field.lower())
    if(url_flag != None):
        return True
    return False