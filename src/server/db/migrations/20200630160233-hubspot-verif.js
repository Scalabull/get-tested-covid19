'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('VerifiedTestCenters', 'hubspot_company_id', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t }),

      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('VerifiedTestCenters', 'hubspot_company_id', { transaction: t })
      ]);
    });
  }
};
