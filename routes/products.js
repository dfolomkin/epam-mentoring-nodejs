const router = require('express').Router();

const controllers = require('../controllers/products');
const tokenChecker = require('../middlewares').tokenChecker;

router.get('/products', tokenChecker(), controllers.getProducts());
router.get('/products/:id', tokenChecker(), controllers.getProduct());
router.get('/products/:id/reviews', tokenChecker(), controllers.getReviews());
router.post('/products', tokenChecker(), controllers.postProduct());
router.delete('/products/:id', controllers.deleteProduct());

module.exports = router;
