const Users = require('../models').Users;

const getUsers = () => (req, res) => {
  Users.findAll().then(users => res.json(users));
};

module.exports = getUsers;
