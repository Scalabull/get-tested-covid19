'use strict'
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await db.VerifiedTestCenter.bulkCreate(
      [
        {
          public: true,
          address: '32023 W Pumping Station Road Suite 3 , Quakertown PA 18951',
          name: 'DEV COVID-19 Testing Center Richland Township 2',
          phone: '(555) - 123-4567',
          latitude: 40.4582455,
          longitude: -75.3704315,
          description: 'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          latest_verification_by: 'sampleuser',
          latest_verification_at: new Date().getTime(),
          open_24_hours: false
        },
        {
          public: true,
          name: 'DEV COVID-19 Testing Center Cressona 2',
          address: '3235 Sillyman Street Cressona, PA 17929',
          phone_number: '800-555-1234 (5846)',
          latitude: 40.4582455,
          longitude: -75.3704315,
          description: 'You must receive guidance via the MyLVHN Nurse Information line at 1-800-555-1234 or complete an LVHN Video Visit by downloading the MyLVHN app to be assessed and possibly tested. When you arrive at the Assess and Test office, go inside and check in with the registration desk. You will be asked to provide your mobile phone number. Then you can return to your car and wait until the Assess and Test office calls your mobile phone, letting you know you can be seen.',
          latest_verification_by: 'sampleuser',
          latest_verification_at: new Date().getTime(),
          open_24_hours: false
        }
      ],
      { individualHooks: true }
    )
  },

  down: async (queryInterface, Sequelize) => {},
}
