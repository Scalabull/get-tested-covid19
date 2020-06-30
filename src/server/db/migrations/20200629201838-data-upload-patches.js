'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('TestCenterStagings', 'hours_of_operation', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'physician_referral_required', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('TestCenterStagings', 'verified_by_phone_external_party', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'hours_of_operation', {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'physician_referral_required', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
        queryInterface.addColumn('UnverifiedTestCenters', 'verified_by_phone_external_party', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('TestCenterStagings', 'hours_of_operation', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'physician_referral_required', { transaction: t }),
        queryInterface.removeColumn('TestCenterStagings', 'verified_by_phone_external_party', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'physician_referral_required', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'verified_by_phone_external_party', { transaction: t }),
        queryInterface.removeColumn('UnverifiedTestCenters', 'hours_of_operation', { transaction: t })
      ]);
    });
  }
};
