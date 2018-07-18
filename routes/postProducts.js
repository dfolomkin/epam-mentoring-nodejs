const products = require('../models').products;

const postProducts = () => (req, res) => {
  const newProd = { ...req.body, reviews: [] };

  products.push(newProd);
  res.json(newProd);
};

module.exports = postProducts;
