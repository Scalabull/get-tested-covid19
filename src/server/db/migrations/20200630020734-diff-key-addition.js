'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('UnverifiedTestCenters', 'source_unver_diff_key', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'latest_unver_diff_key', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('UnverifiedTestCenters', 'source_unver_diff_key', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'latest_unver_diff_key', { transaction: t })
      ]);
    });
  }
};
