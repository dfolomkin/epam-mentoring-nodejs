const Products = require('../../models').Products;

const deleteProduct = () => (req, res) => {
  Products.findOneAndDelete({ id: +req.params.id }).then(product =>
    res.json(product)
  );
};

module.exports = deleteProduct;
