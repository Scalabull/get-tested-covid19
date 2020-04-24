const fs = require('fs')
require('dotenv').config(process.cwd(), '.env')

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_development`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/postgresql-ca-master.crt'),
      // },
    },
    logging: false,
  },
}
