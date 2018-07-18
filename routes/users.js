const router = require('express').Router();

const getUsers = require('../controllers').getUsers;
const tokenChecker = require('../middlewares').tokenChecker;

router.get('/users', tokenChecker(), getUsers());

module.exports = router;
