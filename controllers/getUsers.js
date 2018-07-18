const users = require('../models').users;

const getUsers = () => (req, res) => {
  res.json(users);
};

module.exports = getUsers;
