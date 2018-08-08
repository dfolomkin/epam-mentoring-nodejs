const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const logins = require('../../models').logins;

passport.use(
  new LocalStrategy(
    { usernameFiled: 'username', passwordFiled: 'password', session: false },
    (username, password, done) => {
      const login = logins.find(
        item => item.username === username && item.password === password
      );
      if (!login) {
        done(null, false, 'Bad username/password.');
      } else {
        done(null, login);
      }
    }
  )
);

module.exports = passport;
