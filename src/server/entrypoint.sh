#!/bin/ash
set -e

npx sequelize-cli db:migrate
node /src/server/db/scripts/run_unverified_test_center_diff_merges.js
exec node /src/server/server.js "$@"