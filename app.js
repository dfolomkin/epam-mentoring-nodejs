const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const cookieParser = require('./middlewares').cookieParser;
const queryParser = require('./middlewares').queryParser;
const routes = require('./routes');

const app = express();
const router = express.Router();

app.engine('html', ejs.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

app.use(cookieParser());
app.use(queryParser());
app.use(bodyParser());

router.get('/', (req, res) => {
  res.send('hello!');
});

router.get('/meta', routes.getMeta());

router.get('/api/products', routes.getProducts());

router.get('/api/products/:id', routes.getProduct());

router.get('/api/products/:id/reviews', routes.getReviews());

router.get('/addProduct', routes.getAddProductPage());

router.post('/api/products', routes.postProducts());

router.get('/api/users', routes.getUsers());

app.use('/', router);

module.exports = app;
