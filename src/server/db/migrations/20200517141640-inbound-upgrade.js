'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Inbounds', 'full_address', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.changeColumn('Inbounds', 'description', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
        queryInterface.changeColumn('Inbounds', 'url', {
          type: Sequelize.DataTypes.TEXT
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Inbounds', 'full_address', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.changeColumn('Inbounds', 'description', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.changeColumn('Inbounds', 'url', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });
  }
};
