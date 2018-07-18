const Cities = require('../../models').Cities;

const deleteCity = () => (req, res) => {
  Cities.findOneAndDelete({ id: +req.params.id }).then(city => res.json(city));
};

module.exports = deleteCity;
