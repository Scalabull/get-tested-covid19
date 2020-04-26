'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSearches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      zip_code: {
        type: Sequelize.STRING,
      },
      user_latitude: {
        type: Sequelize.FLOAT,
      },
      user_longitude: {
        type: Sequelize.FLOAT,
      },
      user_ip: {
        type: Sequelize.STRING,
      },
      search_timestamp: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSearches')
  },
}
