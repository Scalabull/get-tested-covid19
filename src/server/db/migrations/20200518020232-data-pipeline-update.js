'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('TestCenterStagings', 'city', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'state', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'zipcode', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'location', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'walk_in_site', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'operation_period', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'facilities_provided', { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'description', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'inbounds_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Inbounds',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('TestCenterStagings', 'city', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'state', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'zipcode', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'location', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'walk_in_site', {
          type: Sequelize.DataTypes.BOOLEAN
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'operation_period', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'facilities_provided', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'description', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'inbounds_id', { transaction: t }),
      ]);
    });
  }
};
