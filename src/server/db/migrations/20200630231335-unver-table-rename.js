'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('UnverifiedTestCenters', 'PublicTestCenters')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('PublicTestCenters', 'UnverifiedTestCenters')
  }
};
