const getGoogleCallback = () => (req, res) => {
  res.send('Logged in with Google strategy.');
};

module.exports = getGoogleCallback;
