const jwt = require('jsonwebtoken');

const Logins = require('../../models').Logins;

const postAuthJwt = () => (req, res) => {
  const { username, password } = req.body;
  Logins.findOne({ username, password }).then(login => {
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

      res
        .status(200)
        // .send({
        //   code: 200,
        //   message: 'OK',
        //   data: { user: payload },
        //   token: token
        // })
        .redirect('../../');
    }
  });
};

module.exports = postAuthJwt;
