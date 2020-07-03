# The data pipeline

This is a series of steps for refining and validating data. All of these steps are meant to be handled by the /data_pipelines scripts, which are all Python scripts. These scripts can be run locally in the /bin directory. In production, these scripts

Python is used here for easier handling of CSV files, quick text parsing, simple web scrapers, and ease of access to machine learning libraries like spaCy and scikit-learn. 


# Development
Pipenv is used to track python packages (similar to Node's NPM or Yarn).

From the /data_pipeline directory, run:
```
#Installs python packages and sets up python
pipenv install

#Load the python environment
pipenv shell

#Run a script
cd bin
source ./inbound_to_staging_batch.sh
```

To exit the python environment, type 'exit' in the shell.

For development, you have two options for running scripts locally:

1. You can use the staging API (https://staging.api.get-tested-covid19.org). This is quick and the best way forward for most uses cases in the data pipeline scripts. Scripts are configured to point to the staging api by default.

2. You can run against a local server, which you can create with 'docker-compose up'. This is helpful for debugging server errors, examining underlying queries, querying the postgresql database to understand changes to data.

There are challenges to using the local server. Basic familiarity with Docker and docker-compose are recommended. You will also need to use sequelize-cli to 'migrate' and 'seed' your local database so that it includes tables and data. You should also have familiarity with postgresql, basic SQL, and psql. 

## Secret keys, environment variables
Some scripts require secret keys that are not committed to source control. These should be loaded thru environment variables.

TODO: setup dotenv.

# Deployment / Production
These scripts are currently deployed with serverless.com.

NOTE: Environment variables containing sensitive credentails (username, password) are set on the serverless deployment.

## Useful snippets
```
# If you are performing a code review of a new merged dataset (a key in the CHRONOLOGICAL_DIFF_KEYS file),
# It will be useful to access the diff object on S3 for examination.
aws s3 cp s3://staging-gtc-data-batches/unver-staged-jobs/su_XYZ_report.json ./
# NOTE: Do not commit these files to source control.

```

## Updating Maine DHHS data:

1. Configure your local environment in /src/data_pipeline/.env .
- Use the production API for this entire process. 
- You will need a production user account and password with our Get Tested COVID service.
- You will need a valid Google API key with the Geolocation API enabled. 

2. First, you will propose changes to the dataset. You'll do this from your local machine, and as output, 'diff' files will be created in S3. These files will tell the database what changes to make.

```
# This command proposes changes
python cmd_load_new_test_centers.py --delete maine

```
### TODO: complete this document...