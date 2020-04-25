'use strict'
module.exports = (sequelize, DataTypes) => {
  const TestCenterStaging = sequelize.define(
    'TestCenterStaging',
    {
      accepted: DataTypes.INTEGER,
      location: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      phone_number: DataTypes.STRING,
      hours_of_operation: DataTypes.STRING,
      days_of_operation: DataTypes.STRING,
      operation_period: DataTypes.STRING,
      website: DataTypes.STRING,
      appointment_required: DataTypes.BOOLEAN,
      doctor_screen_required_beforehand: DataTypes.BOOLEAN,
      drive_thru_site: DataTypes.BOOLEAN,
      walk_in_site: DataTypes.BOOLEAN,
      facilities_provided: DataTypes.STRING,
      estimated_daily_test_capacity: DataTypes.INTEGER,
      comments: DataTypes.STRING,
      address_freetext_blob: DataTypes.STRING,
      closed: DataTypes.BOOLEAN,
      date_closed: DataTypes.DATE,
    },
    {}
  )
  TestCenterStaging.associate = function (models) {
    // associations can be defined here
  }
  return TestCenterStaging
}
