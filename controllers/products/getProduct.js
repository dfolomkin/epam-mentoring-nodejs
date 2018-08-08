const Products = require('../../models').Products;

const getProduct = () => (req, res) => {
  Products.findOne({ id: +req.params.id }).then(products => res.json(products));
};

module.exports = getProduct;
