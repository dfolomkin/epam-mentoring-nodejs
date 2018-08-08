const Cities = require('../../models').Cities;

const putCity = () => (req, res) => {
  Cities.findOneAndUpdate(
    { id: +req.params.id },
    {
      name: req.body.name,
      country: req.body.country,
      capital: req.body.capital,
      location: { lat: req.body.lat, long: req.body.long }
    }
  ).then(city => {
    if (city) {
      res.json(city);
    } else {
      Cities.create({
        id: +req.params.id,
        name: req.body.name,
        country: req.body.country,
        capital: req.body.capital,
        location: { lat: req.body.lat, long: req.body.long }
      })
        .then(city => res.status(200).redirect('../'))
        .catch(err => res.status(500).redirect('../'));
    }
  });
};

module.exports = putCity;
