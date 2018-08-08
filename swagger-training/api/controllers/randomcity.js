'use strict';

var request = require('request');

module.exports = { getRandomCity: getRandomCity };

var getRandomCity = () => (req, res) => {
  const url = 'http://localhost:9000/api/randomcity';
  request.get(url).pipe(res);
};
