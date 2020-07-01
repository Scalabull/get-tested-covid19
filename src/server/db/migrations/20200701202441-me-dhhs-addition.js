'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('TestCenterStagings', 'me_dhhs_status', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('TestCenterStagings', 'me_dhhs_status', { transaction: t })
      ]);
    });
  }
};
