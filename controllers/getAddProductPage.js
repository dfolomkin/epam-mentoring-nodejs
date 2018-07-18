const fs = require('fs');
const p = require('path');

const getAddProductPage = () => (req, res) => {
  const html = fs.readFileSync(p.resolve('./views', 'prodAdd.html'));

  res.render('prodAdd.html', html);
};

module.exports = getAddProductPage;
