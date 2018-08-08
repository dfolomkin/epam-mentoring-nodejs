const getMeta = () => (req, res) => {
  res.json({ parsedCookies: req.parsedCookies, parsedQuery: req.parsedQuery });
};

module.exports = getMeta;
