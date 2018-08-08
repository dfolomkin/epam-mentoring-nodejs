const router = require('express').Router();

const postAuthJwt = require('../controllers/auth').postAuthJwt;

router.post('/auth', postAuthJwt());

module.exports = router;
