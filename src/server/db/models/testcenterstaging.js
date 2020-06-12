'use strict'

module.exports = (sequelize, DataTypes) => {
  const TestCenterStaging = sequelize.define(
    'TestCenterStaging',
    {
      external_id: DataTypes.INTEGER,
      public: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.DECIMAL(9,6),
      longitude: DataTypes.DECIMAL(9,6),
      geolocation: DataTypes.GEOMETRY,
      phone_number: DataTypes.STRING,
      hours_of_operation: DataTypes.STRING,
      days_of_operation: DataTypes.STRING,
      website: DataTypes.TEXT,
      appointment_required: DataTypes.BOOLEAN,
      doctor_screen_required_beforehand: DataTypes.BOOLEAN,
      drive_thru_site: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      estimated_daily_test_capacity: DataTypes.INTEGER,
      comments: DataTypes.TEXT,
      address_freetext_blob: DataTypes.TEXT,
      closed: DataTypes.BOOLEAN,
      date_closed: DataTypes.DATE,
      inbounds_id: DataTypes.INTEGER,
      google_place_id: DataTypes.TEXT
    },
    {
      hooks: {
        beforeCreate: (testCenterStaging) => {
          return updateGeolocation(testCenterStaging)
        },
        beforeUpdate: (testCenterStaging) => {
          return updateGeolocation(testCenterStaging)
        },
      },
    }
  )
  
  TestCenterStaging.associate = function (models) {
  }

  const updateGeolocation = async (testCenterStaging) => {
    if (
      testCenterStaging.changed('latitude') ||
      testCenterStaging.changed('longitutde')
    ) {
      if (
        testCenterStaging.longitude === null ||
        testCenterStaging.latitude === null
      ) {
        return
      }

      testCenterStaging.geolocation = {
        type: 'Point',
        coordinates: [testCenterStaging.longitude, testCenterStaging.latitude],
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      }
    }
  }
  return TestCenterStaging
}
