'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inbound = sequelize.define('Inbound', {
    full_address: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Inbound.associate = function(models) {
    // associations can be defined here
  };
  return Inbound;
};