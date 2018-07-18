const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const TWITTER_CONSUMER_KEY = 'i8DnXuTPLBLtUUpp8RiNmI6CT';
const TWITTER_CONSUMER_SECRET =
  'ADVInNHzAD7gJV4KQBFaqSqcyrKrQIqImQoSMZ8cEmvAPRMCME';

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:9000/api/login/twitter/callback'
    },
    (token, tokenSecret, profile, cb) => {
      if (profile) {
        return cb(null, profile);
      }
    }
  )
);

module.exports = passport;
