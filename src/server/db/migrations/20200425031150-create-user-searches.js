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
      latitude: {
        type: Sequelize.DECIMAL(9,6),
      },
      longitude: {
        type: Sequelize.DECIMAL(9,6),
      },
      is_geolocated_query: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_ip: {
        type: Sequelize.STRING,
      },
      search_timestamp: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSearches')
  },
}
