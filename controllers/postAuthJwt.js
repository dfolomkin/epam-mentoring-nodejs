const jwt = require('jsonwebtoken');

const logins = require('../models').logins;

const postAuthJwt = () => (req, res) => {
  const { username, password } = req.body;
  const login = logins.find(
    item => item.username === username && item.password === password
  );

  if (!login) {
    res.status(403).send({
      code: 403,
      message: 'Bad username/password.'
    });
  } else {
    const payload = {
      username: login.username,
      email: login.email
    };
    const token = jwt.sign(payload, 'secret', { expiresIn: 20 });

    // for using without client app
    res.cookie('token', token);

    res.status(200).send({
      code: 200,
      message: 'OK',
      data: { user: payload },
      token: token
    });
  }
};

module.exports = postAuthJwt;
