const mongoose = require('mongoose');

const connection = require('./connection');
const usernameValidator = require('./validators').username;
const passwordValidator = require('./validators').password;
const emailValidator = require('./validators').email;

const loginsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: usernameValidator
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator
  }
});
const Logins = connection.model('logins', loginsSchema);

module.exports = Logins;
