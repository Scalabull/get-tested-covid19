'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('PublicTestCenters', 'description', {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('PublicTestCenters', 'description', { transaction: t })
      ]);
    });
  }
};
