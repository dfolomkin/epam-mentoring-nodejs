const router = require('express').Router();

const controllers = require('../controllers');

router.get('/', controllers.getIndexPage());
router.get('/addProduct', controllers.getAddProductPage());
router.get('/authJwt', controllers.getAuthJwtPage());
router.get('/authPassport', controllers.getAuthPassportPage());

module.exports = router;
