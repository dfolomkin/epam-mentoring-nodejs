const router = require('express').Router();

const controllers = require('../controllers');
const tokenChecker = require('../middlewares').tokenChecker;

router.get('/products', tokenChecker(), controllers.getProducts());
router.get('/products/:id', tokenChecker(), controllers.getProduct());
router.get('/products/:id/reviews', tokenChecker(), controllers.getReviews());
router.post('/products', tokenChecker(), controllers.postProducts());

module.exports = router;
