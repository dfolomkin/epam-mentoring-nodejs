const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID =
  '54028511488-u919ig95a0l9jvkrkglhh4k60u3pskbk.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'zqBo6Guc1ucI2HShSD8VGa88';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:9000/api/login/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      if (profile) {
        return cb(null, profile);
      }
    }
  )
);

module.exports = passport;
