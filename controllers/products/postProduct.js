const Products = require('../../models').Products;

const postProduct = () => (req, res) => {
  Products.create({ ...req.body, reviews: [] })
    .then(product => res.status(200).redirect('../'))
    .catch(err => res.status(500).redirect('../'));
};

module.exports = postProduct;
