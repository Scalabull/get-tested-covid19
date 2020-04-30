'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TestCenterStagings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING(2),
      },
      zipcode: {
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      geolocation: {
        type: Sequelize.GEOMETRY('POINT', 4326),
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      hours_of_operation: {
        type: Sequelize.STRING,
      },
      days_of_operation: {
        type: Sequelize.STRING,
      },
      operation_period: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.TEXT,
      },
      appointment_required: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      doctor_screen_required_beforehand: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      drive_thru_site: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      walk_in_site: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      facilities_provided: {
        type: Sequelize.TEXT,
      },
      estimated_daily_test_capacity: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.TEXT,
      },
      address_freetext_blob: {
        type: Sequelize.TEXT,
      },
      closed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      date_closed: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TestCenterStagings')
  },
}
