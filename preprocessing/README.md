Steps needed to run this script:
1. Follow the steps [here](https://towardsdatascience.com/accessing-google-spreadsheet-data-using-python-90a5bc214fd2) to ( all the way to where it says "Reading spreadsheet data with Python") in order to generate the right credentials and connect to the GSheet. Use the same account that you used for authenticating to GCS so you don't need a separate credentials file for that.
2. Add a JSON containing credentials to the same folder as script.
3. Update the constants declared early in the script to reflect the name of your credentials file, GCS bucket name, as well as the JSON file that will be stored and then uploaded to server. 
