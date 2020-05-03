'use strict'
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await db.User.create(
        {
            email: 'test@test.com',
            password: 'testtest'
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {})
  },
}
