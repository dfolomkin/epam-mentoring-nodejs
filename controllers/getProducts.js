const products = require('../models').products;

const getProducts = () => (req, res) => {
  res.json(products);
};

module.exports = getProducts;
