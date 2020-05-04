const fs = require('fs')
if(process.env.NODE_ENV !== 'staging' && process.env.NODE_ENV !== 'production'){
  require('dotenv').config(process.cwd(), '.env')
}


module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}`,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: console.log,
    define: {
      underscored: false,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
    define: {
      underscored: false,
    },
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    logging: console.log,
    define: {
      underscored: false,
    },
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/postgresql-ca-master.crt'),
      // },
    },
    logging: false,
    define: {
      underscored: false,
    },
    logging: false,
  },
}
