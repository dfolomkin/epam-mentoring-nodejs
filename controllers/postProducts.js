const Products = require('../models').Products;

const postProducts = () => (req, res) => {
  const newProd = { ...req.body, reviews: 0 };

  Products.insertOrUpdate(newProd).then(
    result => result && res.status(200).redirect('../')
  );
};

module.exports = postProducts;
