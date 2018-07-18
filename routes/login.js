const router = require('express').Router();

const localPassport = require('../config').localPassport;
const facebookPassport = require('../config').facebookPassport;
const twitterPassport = require('../config').twitterPassport;
const googlePassport = require('../config').googlePassport;

const postAuthPassport = require('../controllers').postAuthPassport;
const getFacebookCallback = require('../controllers').getFacebookCallback;
const getTwitterCallback = require('../controllers').getTwitterCallback;
const getGoogleCallback = require('../controllers').getGoogleCallback;

router.post(
  '/local',
  localPassport.authenticate('local', { failureRedirect: '/authPassport' }),
  postAuthPassport()
);

router.get('/facebook', facebookPassport.authenticate('facebook'));
router.get(
  '/facebook/callback',
  facebookPassport.authenticate('facebook', {
    failureRedirect: '/api/login/facebook'
  }),
  getFacebookCallback()
);

router.get('/twitter', twitterPassport.authenticate('twitter'));
router.get(
  '/twitter/callback',
  twitterPassport.authenticate('twitter', {
    failureRedirect: '/api/login/twitter'
  }),
  getTwitterCallback()
);

router.get(
  '/google',
  googlePassport.authenticate('google', { scope: ['profile'] })
);
router.get(
  '/google/callback',
  googlePassport.authenticate('google', {
    failureRedirect: '/api/login/google'
  }),
  getGoogleCallback()
);

module.exports = router;
