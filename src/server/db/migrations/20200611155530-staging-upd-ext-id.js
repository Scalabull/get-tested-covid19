'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('TestCenterStagings', 'external_id', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('TestCenterStagings', 'external_id', { transaction: t })
      ]);
    });
  }
};
