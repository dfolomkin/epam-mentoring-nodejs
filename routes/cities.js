const router = require('express').Router();

const controllers = require('../controllers/cities');

router.get('/randomcity', controllers.getRandomCity());
router.get('/cities', controllers.getCities());
router.post('/cities', controllers.postCity());
router.put('/cities/:id', controllers.putCity());
router.delete('/cities/:id', controllers.deleteCity());

module.exports = router;
