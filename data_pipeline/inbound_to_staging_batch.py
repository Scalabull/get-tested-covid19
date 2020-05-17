# Batch script to be run in e.g. hourly increments

import requests
import os 

# Load username and password from environment
gtc_user = os.environ['GTC_USERNAME']
gtc_pass = os.environ['GTC_PASSWORD']

print("Authenticating with GTC User: ", gtc_user)

# Get Auth Token
authResponse = requests.post("http://localhost:5000/api/v1/auth/login", data={"email": gtc_user,"password": gtc_pass})
authToken = authResponse.json()['token']
headers = {'Authorization': 'Bearer ' + authToken}

freshInboundRows = requests.get("http://localhost:5000/api/v1/internal/inbound/", headers=headers)
print(freshInboundRows.json())