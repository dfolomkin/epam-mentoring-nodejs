const Products = require('../../models').Products;

const getReviews = () => (req, res) => {
  Products.findOne({ id: +req.params.id }).then(product =>
    res.json({ reviews: product.reviews })
  );
};

module.exports = getReviews;
