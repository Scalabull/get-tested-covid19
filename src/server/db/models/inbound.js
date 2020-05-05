'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inbound = sequelize.define('Inbound', {
    full_address: DataTypes.TEXT,
    name: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    url: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {});
  Inbound.associate = function(models) {
    // associations can be defined here
  };
  return Inbound;
};