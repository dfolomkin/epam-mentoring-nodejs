const Users = require('../../models').Users;

const deleteUser = () => (req, res) => {
  Users.findOneAndDelete({ id: +req.params.id }).then(user => res.json(user));
};

module.exports = deleteUser;
