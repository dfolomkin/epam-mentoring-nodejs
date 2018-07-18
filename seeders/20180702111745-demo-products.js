'use strict';

const products = require('../data').products;
products.forEach(item => {
  (item.createdAt = new Date()), (item.updatedAt = new Date());
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
