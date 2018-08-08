const username = {
  validator: value => /\w{4,20}/.test(value),
  message: '{VALUE} is not a valid username'
};

module.exports = username;
