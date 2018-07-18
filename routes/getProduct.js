const products = require('../models').products;

const getProduct = () => (req, res) => {
  const newProduct = products.find(item => item.prodId == req.params.id);

  res.json(newProduct);
};

module.exports = getProduct;
