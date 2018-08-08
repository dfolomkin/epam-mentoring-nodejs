const random = require('lodash').random;

const Cities = require('../../models').Cities;

const getRandomCity = () => (req, res) => {
  Cities.find({}).then(cities => {
    if (!cities.length) {
      res.send('City collection is empty!');
    } else {
      Cities.findOne({ id: cities[random(1, cities.length) - 1].id }).then(
        city => res.json(city)
      );
    }
  });
};

module.exports = getRandomCity;
