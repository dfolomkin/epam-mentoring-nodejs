const router = require('express').Router();

const localPassport = require('../config/passports').local;
const facebookPassport = require('../config/passports').facebook;
const twitterPassport = require('../config/passports').twitter;
const googlePassport = require('../config/passports').google;

const postAuthPassport = require('../controllers/auth').postAuthPassport;
const getFacebookCallback = require('../controllers/auth').getFacebookCallback;
const getTwitterCallback = require('../controllers/auth').getTwitterCallback;
const getGoogleCallback = require('../controllers/auth').getGoogleCallback;

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
