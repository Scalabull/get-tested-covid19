'use strict'
module.exports = (sequelize, DataTypes) => {
  const TestCenter = sequelize.define(
    'PublicTestCenter',
    {
      external_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      full_formatted_address: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL(9,6),
      longitude: DataTypes.DECIMAL(9,6),
      geolocation: DataTypes.GEOMETRY,
      phone_number: DataTypes.STRING,
      phone_number_description: DataTypes.STRING,
      secondary_phone_number: DataTypes.STRING,
      secondary_phone_number_description: DataTypes.STRING,
      website: DataTypes.TEXT,
      appointment_required: DataTypes.BOOLEAN,
      doctor_screen_required_beforehand: DataTypes.BOOLEAN,
      drive_thru_site: DataTypes.BOOLEAN,
      physician_referral_required: DataTypes.BOOLEAN,
      confirmed_result_days_min: DataTypes.INTEGER,
      confirmed_result_days_max: DataTypes.INTEGER,
      free_testing_for_all: DataTypes.BOOLEAN,
      verified_by_phone_external_party: DataTypes.BOOLEAN,
      walk_in_site: DataTypes.BOOLEAN,
      me_dhhs_status: DataTypes.INTEGER,
      public_description: DataTypes.TEXT,
      description: DataTypes.TEXT,
      estimated_daily_test_capacity: DataTypes.INTEGER,
      comments: DataTypes.TEXT,
      address_freetext_blob: DataTypes.TEXT,
      closed: DataTypes.BOOLEAN,
      date_closed: DataTypes.DATE,
      test_result_turnaround_time: DataTypes.STRING,
      is_designated_covid_facility: DataTypes.BOOLEAN,
      facility_wants_to_be_contacted_for_further_help: DataTypes.BOOLEAN,
      open_hour_mon: DataTypes.INTEGER,
      open_hour_tues: DataTypes.INTEGER,
      open_hour_weds: DataTypes.INTEGER,
      open_hour_thurs: DataTypes.INTEGER,
      open_hour_fri: DataTypes.INTEGER,
      open_hour_sat: DataTypes.INTEGER,
      open_hour_sun: DataTypes.INTEGER,
      close_hour_mon: DataTypes.INTEGER,
      close_hour_tues: DataTypes.INTEGER,
      close_hour_weds: DataTypes.INTEGER,
      close_hour_thurs: DataTypes.INTEGER,
      close_hour_fri: DataTypes.INTEGER,
      close_hour_sat: DataTypes.INTEGER,
      close_hour_sun: DataTypes.INTEGER,
      open_24_hours: DataTypes.BOOLEAN,
      hours_of_operation: DataTypes.TEXT,
      exported_to_crm_at: DataTypes.DATE,
      verified_at: DataTypes.DATE,
      google_place_id: DataTypes.TEXT,
      staging_row_id: DataTypes.INTEGER,
      source_unver_diff_key: DataTypes.STRING,
      latest_unver_diff_key: DataTypes.STRING
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
