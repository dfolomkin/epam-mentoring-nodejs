const router = require('express').Router();

const controllers = require('../controllers/users');
const tokenChecker = require('../middlewares').tokenChecker;

router.get('/users', tokenChecker(), controllers.getUsers());
router.delete('/users/:id', controllers.deleteUser());

module.exports = router;
