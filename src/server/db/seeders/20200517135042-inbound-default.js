'use strict'
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await db.Inbound.bulkCreate(
      [
        {
          full_address: '320 W Pumping Station Road Suite 3 , Quakertown PA 18951',
          name: 'DEV COVID-19 Testing Center Richland Township',
          phone: '(555) - 123-4567',
          description: 'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.'
        },
        {
          name: 'DEV COVID-19 Testing Center Cressona',
          full_address: '35 Sillyman Street Cressona, PA 17929',
          phone_number: '800-555-1234 (5846)',
          description:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        },
        {
          name: 'DEV COVID-19 Testing Center Halzeton',
          full_address: '140 N Sherman Court Halzeton PA, 18201',
          phone: '800-555-1234 (5846)',
          url:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-hazleton',
          description:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        },
        {
          name: 'DEV COVID-19 Testing Center Macungie',
          full_address: '6451 Village Lane Macungie PA 18062',
          phone: '800-555-1234 (5846)',
          url:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-macungie',
          description:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        },
        {
          name: 'DEV COVID-19 Testing Center MacArthur Road',
          full_address: '2741 MacArthur Road Whitehall PA 18052',
          phone: '800-555-1234 (5846)',
          url:
            'https://www.lvhn.org/locations/lvhn-covid-19-assess-and-test-macarthur-road',
          description:
            'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
        },
      ],
      { individualHooks: true }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Inbounds', null, {})
  },
}
