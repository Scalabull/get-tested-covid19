'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSearch = sequelize.define('UserSearch', {
    zip_code: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(9,6),
    longitude: DataTypes.DECIMAL(9,6),
    is_geolocated_query: DataTypes.BOOLEAN,
    user_ip: DataTypes.STRING,
    search_timestamp: DataTypes.DATE
  }, {});
  UserSearch.associate = function(models) {
    // associations can be defined here
  };
  return UserSearch;
};