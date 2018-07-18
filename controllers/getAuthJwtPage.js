const fs = require('fs');
const p = require('path');

const getAuthPage = () => (req, res) => {
  const html = fs.readFileSync(p.resolve('./views', 'authJwt.html'));

  res.render('authJwt.html', html);
};

module.exports = getAuthPage;
