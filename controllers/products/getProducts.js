const Products = require('../../models').Products;

const getProducts = () => (req, res) => {
  Products.find({}).then(products => res.json(products));
};

module.exports = getProducts;
