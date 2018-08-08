const Cities = require('../../models').Cities;

const getCities = () => (req, res) => {
  Cities.find({}).then(cities => res.json(cities));
};

module.exports = getCities;
