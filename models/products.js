'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define(
    'Products',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      reviews: DataTypes.INTEGER
    },
    {}
  );
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};
