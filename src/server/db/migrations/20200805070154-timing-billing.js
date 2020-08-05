'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('PublicTestCenters', 'confirmed_result_days_min', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('PublicTestCenters', 'confirmed_result_days_max', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('PublicTestCenters', 'free_testing_for_all', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'confirmed_result_days_min', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'confirmed_result_days_max', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'free_testing_for_all', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('PublicTestCenters', 'confirmed_result_days_min', { transaction: t }),
        queryInterface.removeColumn('PublicTestCenters', 'confirmed_result_days_max', { transaction: t }),
        queryInterface.removeColumn('PublicTestCenters', 'free_testing_for_all', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'confirmed_result_days_min', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'confirmed_result_days_max', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'free_testing_for_all', { transaction: t })
      ]);
    });
  }
};
