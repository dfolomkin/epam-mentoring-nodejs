'use strict';

const logins = require('../data').logins;
logins.forEach(item => {
  (item.createdAt = new Date()), (item.updatedAt = new Date());
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logins', logins, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Logins', null, {});
  }
};
