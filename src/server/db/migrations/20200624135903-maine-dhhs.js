'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('VerifiedTestCenters', 'symptoms_required', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'symptoms_required', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('TestCenters', 'symptoms_required', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('VerifiedTestCenters', 'symptoms_required', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'symptoms_required', { transaction: t }),
        queryInterface.removeColumn('TestCenters', 'symptoms_required', { transaction: t }),
      ]);
    });
  }
};
