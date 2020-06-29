'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('VerifiedTestCenters', 'me_dhhs_status', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'me_dhhs_status', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('TestCenters', 'me_dhhs_status', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('VerifiedTestCenters', 'me_dhhs_status', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'me_dhhs_status', { transaction: t }),
        queryInterface.removeColumn('TestCenters', 'me_dhhs_status', { transaction: t }),
      ]);
    });
  }
};
