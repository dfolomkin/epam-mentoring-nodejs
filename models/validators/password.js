const password = {
  validator: value => /\w{5,10}/.test(value),
  message: '{VALUE} is not a valid password'
};

module.exports = password;
