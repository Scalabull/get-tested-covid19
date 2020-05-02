'use strict'
module.exports = (sequelize, DataTypes) => {
  const TestCenter = sequelize.define(
    'TestCenter',
    {
      public: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL(9,6),
      longitude: DataTypes.DECIMAL(9,6),
      geolocation: DataTypes.GEOMETRY,
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
    {
      hooks: {
        beforeCreate: (testCenter) => {
          return updateGeolocation(testCenter)
        },
        beforeUpdate: (testCenter) => {
          return updateGeolocation(testCenter)
        },
      },
    }
  )
  TestCenter.associate = function (models) {
    // associations can be defined here
  }

  const updateGeolocation = async (testCenter) => {
    if (testCenter.changed('latitude') || testCenter.changed('longitutde')) {
      if (testCenter.longitude === null || testCenter.latitude === null) {
        return
      }

      testCenter.geolocation = {
        type: 'Point',
        coordinates: [testCenter.longitude, testCenter.latitude],
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      }
    }
  }
  return TestCenter
}
