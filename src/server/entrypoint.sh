#!/bin/ash
set -e

npx sequelize-cli db:migrate
node /src/data_pipeline/run_unverified_test_center_diff_merges.js
exec node /src/server/server.js "$@"