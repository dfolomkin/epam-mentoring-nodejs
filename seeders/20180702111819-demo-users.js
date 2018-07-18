'use strict';

const users = require('../data').users;
users.forEach(item => {
  (item.createdAt = new Date()), (item.updatedAt = new Date());
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
