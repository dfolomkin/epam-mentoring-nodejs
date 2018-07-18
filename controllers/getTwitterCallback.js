const getTwitterCallback = () => (req, res) => {
  res.send('Logged in with Twitter strategy.');
};

module.exports = getTwitterCallback;
