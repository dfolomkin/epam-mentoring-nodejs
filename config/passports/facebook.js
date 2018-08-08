const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = 2019740734704879;
const FACEBOOK_APP_SECRET = 'c5b47bf6708a33edea9af2963209bba9';

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:9000/api/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      if (profile) {
        return cb(null, profile);
      }
    }
  )
);

module.exports = passport;
