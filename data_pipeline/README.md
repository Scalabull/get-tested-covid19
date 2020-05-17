# The data pipeline

This is a series of steps for refining and validating data. All of these steps are meant to be handled by the /data_pipelines scripts, which are all Python scripts. These scripts can be run locally in the /bin directory. In production, these scripts

Python is used here for easier handling of CSV files, quick text parsing, simple web scrapers, and ease of access to machine learning libraries like spaCy and scikit-learn. 

## Steps:

1. Batch insertions into the Inbounds table. This table contains a few text blobs for address, description, name, and a few other fields. Sources include scraped data, and manually-human-curated entries. 

2. A periodic (e.g. hourly) batch job runs to pull any useful rows from the Inbounds table into the TestCenterStagings table. In this process, addresses must be broken-down into structured components (zip, city, state) and geocoded for lat,lng. Descriptions are parsed to search for likely indicators of drive-thru, appointments, screenings, phone numbers, and more.

At this stage, we use geolocation, address, and name to identify which rows are duplicates that are already in our system, versus which are new rows. 

3. New rows that don't match a test center in our system are also added to Unverified Test Centers. 

4. Unverified Test Centers are exported on a regular basis and imported into HubSpot CRM, where humans verify the content, call the test center, and clean up the data. As of writing (May 17, 2020), we currently have over 100 volunteers that help with this verification process.

5. Regular exports are made from HubSpot. These are imported into the Verified Test Centers table. IDs are used to identify new versus existing data. 

When these test center rows are exported from hubspot / imported to VerifiedTestCenters, the rows are also flagged in UnverifiedTestCenters so that they are hidden in this table (marked as verified).

HubSpot is treated as our source of truth. Our VerifiedTestCenters table could, in theory, be rebuilt at any point by exporting exactly what is in HubSpot. We've chosen to do this because HubSpot allows us to perform all CRUD operations on test centers, plus there are a massive team of volunteers verifying data... One exception: rows with incomplete or obviously incorrect data are not inserted into the VerifiedTestCenters table.


# Development
Run the scripts locally:
```
cd bin
source ./inbound_to_staging_batch.sh
```

For development, you have two options for running scripts locally:

1. You can use the staging API (https://staging.api.get-tested-covid19.org). This is quick and the best way forward for most uses cases in the data pipeline scripts.

2. You can run against a local server, which you can create with 'docker-compose up'. This is helpful for debugging server errors, examining underlying queries, querying the postgresql database to understand changes to data.

There are challenges to using the local server. Basic familiarity with Docker and docker-compose are recommended. You will also need to use sequelize-cli to 'migrate' and 'seed' your local database so that it includes tables and data. You should also have familiarity with postgresql, basic SQL, and psql. 

# Deployment / Production
These scripts are currently deployed with serverless.com.

NOTE: Environment variables containing sensitive credentails (username, password) are set on the serverless deployment.