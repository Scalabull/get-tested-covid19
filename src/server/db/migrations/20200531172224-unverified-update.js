'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('UnverifiedTestCenters', 'open_24_hours', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'google_place_id', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'full_formatted_address', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'staging_row_id', {
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('UnverifiedTestCenters', 'open_24_hours', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false
        }, { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'google_place_id', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'full_formatted_address', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'staging_row_id', { transaction: t }),
      ]);
    });
  }
};
