#!/bin/sh
# NOTE: This is intended for local development usage.
# For production deployments, environment variables are loaded at the infrastructure layer.

export GTC_USERNAME=test@test.com
export GTC_PASSWORD=testtest
python ../inbound_to_staging_batch.py