const jwt = require('jsonwebtoken');

const tokenChecker = () => (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).send({
      message: 'No token provided.'
    });
  } else {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.send({
          message: 'Failed to authenticate token.'
        });
      } else {
        next();
      }
    });
  }
};

module.exports = tokenChecker;
