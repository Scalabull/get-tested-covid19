'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnverDiff = sequelize.define('UnverDiff', {
    diff_s3_url: DataTypes.TEXT
  }, {});
  UnverDiff.associate = function(models) {
    // associations can be defined here
  };
  return UnverDiff;
};