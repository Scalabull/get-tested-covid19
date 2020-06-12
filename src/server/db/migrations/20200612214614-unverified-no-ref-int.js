'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('UnverifiedTestCenters', 'UnverifiedTestCenters_staging_row_id_fkey', { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('UnverifiedTestCenters', 'staging_row_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'TestCenterStagings',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }, { transaction: t }),
      ]);
    });
  }
};
