'use strict';
module.exports = (sequelize, DataTypes) => {
  var Logins = sequelize.define(
    'Logins',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Logins.associate = function(models) {
    // associations can be defined here
  };
  return Logins;
};
