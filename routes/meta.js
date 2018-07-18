const router = require('express').Router();

const getMeta = require('../controllers').getMeta;

router.get('/meta', getMeta());

module.exports = router;
