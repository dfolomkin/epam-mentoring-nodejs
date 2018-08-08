const mongoose = require('mongoose');

const connection = mongoose.createConnection(
  'mongodb://localhost:27017/hw7-db',
  { useNewUrlParser: true }
);

module.exports = connection;
