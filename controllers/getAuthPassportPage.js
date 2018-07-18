const fs = require('fs');
const p = require('path');

const getAuthPassportPage = () => (req, res) => {
  const html = fs.readFileSync(p.resolve('./views', 'authPassport.html'));

  res.render('authPassport.html', html);
};

module.exports = getAuthPassportPage;
