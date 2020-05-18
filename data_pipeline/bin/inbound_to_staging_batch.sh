#!/bin/sh
# NOTE: This is intended for local development usage.

# The following environment variables serve as defaults - just a quick convenience to allow for local development without a .env file.
# If a .env file is used, these values will be overridden.

export GTC_USERNAME=test@test.com
export GTC_PASSWORD=testtest
export GTC_API_URL=https://staging.api.get-tested-covid19.org
python ../inbound_to_staging_batch.py


# For production deployments, environment variables are loaded at the infrastructure layer.