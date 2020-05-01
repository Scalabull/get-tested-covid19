'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSearches = sequelize.define('UserSearches', {
    zip_code: DataTypes.STRING,
    user_latitude: DataTypes.FLOAT,
    user_longitude: DataTypes.FLOAT,
    user_ip: DataTypes.STRING,
    search_timestamp: DataTypes.DATE
  }, {});
  UserSearches.associate = function(models) {
    // associations can be defined here
  };
  return UserSearches;
};