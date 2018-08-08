const email = {
  validator: value => /.+@.+\..+/.test(value),
  message: '{VALUE} is not a valid email'
};

module.exports = email;
