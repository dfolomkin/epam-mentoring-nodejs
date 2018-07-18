const postAuthPassport = () => (req, res) => {
  res.send('Logged in with local strategy.');
};

module.exports = postAuthPassport;
