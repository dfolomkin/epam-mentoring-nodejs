const products = require('../models').products;

const getReviews = () => (req, res) => {
  const product = products.find(item => item.prodId == req.params.id);

  res.json(product.reviews);
};

module.exports = getReviews;
