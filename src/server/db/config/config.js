const fs = require('fs')
if(process.env.NODE_ENV !== 'staging' && process.env.NODE_ENV !== 'production'){
  require('dotenv').config(process.cwd(), '.env')
}


module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_development`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
    define: {
      underscored: true,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
    define: {
      underscored: true,
    },
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true,
    },
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
    define: {
      underscored: true,
    },
    logging: false,
  },
}
