const Products = require('../models').Products;

const getProduct = () => (req, res) => {
  Products.findAll({ where: { id: [req.params.id, +req.params.id] } }).then(
    products => res.json(products)
  );
};

module.exports = getProduct;
