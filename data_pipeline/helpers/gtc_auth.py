import os 
import requests

GTC_API_URL = os.getenv('GTC_API_URL')

def authenticate_gtc():
    # Load username and password from environment
    gtc_user = os.getenv('GTC_USERNAME')
    gtc_pass = os.getenv('GTC_PASSWORD')

    print("Authenticating with GTC User: ", gtc_user)

    # Get Auth Token
    auth_response = requests.post(GTC_API_URL + "/api/v1/auth/login", data={"email": gtc_user,"password": gtc_pass})
    auth_response.raise_for_status()

    auth_token = auth_response.json()['token']
    return auth_token