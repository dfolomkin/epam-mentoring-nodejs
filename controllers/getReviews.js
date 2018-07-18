const Products = require('../models').Products;

const getReviews = () => (req, res) => {
  Products.findAll({
    where: { id: [req.params.id, +req.params.id] },
    attributes: ['reviews']
  }).then(products => res.json(products));
};

module.exports = getReviews;
