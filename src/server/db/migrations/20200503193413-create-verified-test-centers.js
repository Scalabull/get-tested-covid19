'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VerifiedTestCenters', {
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
      phone_number_description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      secondary_phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      secondary_phone_number_description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      website: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      telehealth_screen_hyperlink: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
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
      latest_verification_by: {
        type: Sequelize.STRING,
        allowNull: false
      },
      latest_verification_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      flagged_as_duplicate: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      test_result_turnaround_time: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null
      },
      is_designated_covid_facility: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
      },
      facility_wants_to_be_contacted_for_further_help: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
      },
      open_hour_mon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_hour_tues: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_hour_weds: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_hour_thurs: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_hour_fri: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_hour_sat: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_hour_sun: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_mon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_tues: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_weds: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_thurs: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_fri: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_sat: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      close_hour_sun: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: null
      },
      open_24_hours: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VerifiedTestCenters')
  },
}
