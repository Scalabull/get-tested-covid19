import googlemaps

def check_gmaps_key_valid(key):
    gmaps = googlemaps.Client(key=key)
    geocode_result = gmaps.geocode('1600 Pennsylvania Ave NW, Washington, DC 20500')

    if(len(geocode_result) > 0):
        return True
    return False