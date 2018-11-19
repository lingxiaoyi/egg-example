'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      age: 18,
      role: 'admin',
      phone: '12121212',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      name: 'John',
      age: 18,
      role: 'admin',
      phone: '12121212',
    }, {});
  },
};
