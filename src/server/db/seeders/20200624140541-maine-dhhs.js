'use strict'
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await db.TestCenter.bulkCreate(
      [
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Halzeton 4',
          address: '14000 N Sherman Court Halzeton PA, 18201',
          city: 'Halzeton',
          state: 'PA',
          zipcode: 18201,
          latitude: 40.4582455,
          longitude: -75.3704315,
          phone_number: '800-555-1234 (5846)',
          url:'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-hazleton',
          open_24_hours: false,
          me_dhhs_status: 0,
          description: 'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Halzeton 5',
          address: '14000 N Sherman Court Halzeton PA, 18201',
          city: 'Halzeton',
          state: 'PA',
          zipcode: 18201,
          latitude: 40.4582455,
          longitude: -75.3704315,
          phone_number: '800-555-1234 (5846)',
          url:'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-hazleton',
          open_24_hours: false,
          me_dhhs_status: 1,
          description: 'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Halzeton 6',
          address: '14000 N Sherman Court Halzeton PA, 18201',
          city: 'Halzeton',
          state: 'PA',
          zipcode: 18201,
          latitude: 40.4582455,
          longitude: -75.3704315,
          phone_number: '800-555-1234 (5846)',
          url:'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-hazleton',
          open_24_hours: false,
          me_dhhs_status: 2,
          description: 'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        }
      ],
      { individualHooks: true }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('TestCenters', null, {})
  },
}
