const mongoose = require('mongoose');

const connection = require('./connection');
const firstCapitalValidator = require('./validators').firstCapital;
const emailValidator = require('./validators').email;

const usersSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  firstName: {
    type: String,
    required: true,
    validate: firstCapitalValidator
  },
  lastName: {
    type: String,
    required: true,
    validate: firstCapitalValidator
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator
  }
});
const Users = connection.model('users', usersSchema);

module.exports = Users;
