const Users = require('../../models').Users;

const getUsers = () => (req, res) => {
  Users.find({}).then(users => res.json(users));
};

module.exports = getUsers;
