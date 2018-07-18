const fs = require('fs');
const p = require('path');

const getIndexPage = () => (req, res) => {
  const html = fs.readFileSync(p.resolve('./views', 'index.html'));

  res.render('index.html', html);
};

module.exports = getIndexPage;
