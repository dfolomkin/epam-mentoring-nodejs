const getFacebookCallback = () => (req, res) => {
  res.send('Logged in with Facebook strategy.');
};

module.exports = getFacebookCallback;
