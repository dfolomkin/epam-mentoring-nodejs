const Products = require('../models').Products;

const getProducts = () => (req, res) => {
  Products.findAll().then(products => res.json(products));
};

module.exports = getProducts;
