const firstCapital = {
  validator: value => /[A-Z].+/.test(value),
  message: 'it should start from capital'
};

module.exports = firstCapital;
