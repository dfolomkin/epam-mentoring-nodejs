const Cities = require('../../models').Cities;

const postCity = () => (req, res) => {
  const { lat, long, ...rest } = req.body;

  Cities.create({ ...rest, location: { lat, long } })
    .then(city => res.status(200).redirect('../'))
    .catch(err => res.status(500).redirect('../'));
};

module.exports = postCity;
