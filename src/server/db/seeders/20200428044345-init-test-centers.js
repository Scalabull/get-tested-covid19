'use strict'
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await db.TestCenter.bulkCreate(
      [
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Richland Township',
          address: '320 W Pumping Station Road Suite 3',
          city: 'Quakertown',
          state: 'PA',
          zipcode: 18951,
          latitude: 40.4582455,
          longitude: -75.3704315,
          phone_number: '555-123-4567',
          hours_of_operation:
            '8AM to 8PM Monday - Friday & 9AM-3PM Saturday - Sunday',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-richland-township',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Cressona',
          address: '35 Sillyman Street',
          city: 'Cressona',
          state: 'PA',
          zipcode: 17929,
          latitude: 40.6325356,
          longitude: -76.1951129,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation:
            '8AM-5PM Monday - Friday and 9AM - 3PM Saturday and Sunday',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-cressona',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Halzeton',
          address: '140 N Sherman Court',
          city: 'Halzeton',
          state: 'PA',
          zipcode: 18201,
          latitude: 40.9587186,
          longitude: -75.9783748,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation:
            '8AM - 5PM Monday - Friday and 9AM - 3PM Saturday and Sunday',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-hazleton',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Macungie',
          address: '6451 Village Lane',
          city: 'Macungie',
          state: 'PA',
          zipcode: 18062,
          latitude: 40.520269,
          longitude: -75.5685687,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation:
            'Monday - Friday 8AM to 8PM and Saturday - Sunday 9AM to 3PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-macungie',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: false,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center MacArthur Road',
          address: '2741 MacArthur Road',
          city: 'Whitehall',
          state: 'PA',
          zipcode: 18052,
          latitude: 40.6471132,
          longitude: -75.4970779,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation: 'Monday - Sunday 8AM to 8PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-macarthur-road',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Stroudsburg',
          address: '1655 W Main Street',
          city: 'Stroudsburg',
          state: 'PA',
          zipcode: 18360,
          latitude: 40.9822194,
          longitude: -75.2176547,
          phone_number: 'Call 888-402-LVHN (5846)',
          hours_of_operation:
            'Monday - Friday 8AM to 5PM and Saturday - Sunday 9AM to 3PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-stroudsburg',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Palmerton',
          address: '528 Delaware Avenue',
          city: 'Palmerton',
          state: 'PA',
          zipcode: 18071,
          latitude: 40.8039906,
          longitude: -75.6057358,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation:
            'Monday - Friday 8AM to 8PM and Saturday - Sunday 9AM to 3PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-palmerton',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Nazareth',
          address: '863 Nazareth Pike',
          city: 'Nazareth',
          state: 'PA',
          zipcode: 18064,
          latitude: 40.7321277,
          longitude: -75.3160391,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation:
            'Monday - Friday at 8AM to 5PM and Saturday - Sunday at 9AM to 3PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-nazareth',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Muhlenberg',
          address: '2604 Schoenersville Road',
          city: 'Bethlehem',
          state: 'PA',
          zipcode: 18017,
          latitude: 40.6453949,
          longitude: -75.406933,
          phone_number: '555-123-4567',
          hours_of_operation:
            'Monday - Friday 8AM to 5PM and Saturday - Sunday 9AM to 3PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-muhlenberg',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center 17th Street',
          address: '1730 W. Chew Street',
          city: 'Allentown',
          state: 'PA',
          zipcode: 18104,
          latitude: 40.6002083,
          longitude: -75.4975101,
          phone_number: '555-123-4567',
          hours_of_operation:
            'Monday - Friday 8AM to 5PM and Saturday - Sunday 9AM - 3PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-17th-street',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
        {
          public: true,
          name: 'DEV COVID-1 Testing Center Bartonsville',
          address: '292 Frantz Road Suite 102',
          city: 'Stroudsburg',
          state: 'PA',
          zipcode: 18360,
          latitude: 40.9996483,
          longitude: -75.2659144,
          phone_number: '800-555-1234 (5846)',
          hours_of_operation: 'Monday - Sunday 8AM to 8PM',
          days_of_operation:
            'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          operation_period: 'Since March 21st',
          website:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-bartonsville',
          appointment_required: true,
          doctor_screen_required_beforehand: true,
          drive_thru_site: false,
          walk_in_site: true,
          facilities_provided:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          estimated_daily_test_capacity: null,
          comments: '',
          address_freetext_blob: '',
        },
      ],
      { individualHooks: true }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('TestCenters', null, {})
  },
}
