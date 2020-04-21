const fs = require('fs')

module.exports = {
  development: {
    username: '',
    password: null,
    database: 'gettestedDB_development',
    host: '127.0.0.1',
    dialect: 'postgresql',
    operatorsAliases: false,
  },
  test: {
    username: '',
    password: null,
    database: 'gettestedDB_test',
    host: '127.0.0.1',
    dialect: 'postgresql',
    operatorsAliases: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgresql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(__dirname + '/postgresql-ca-master.crt'),
      },
    },
  },
}
