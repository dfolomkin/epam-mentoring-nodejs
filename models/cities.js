const Schema = require('mongoose').Schema;

const connection = require('./connection');
const firstCapitalValidator = require('./validators').firstCapital;

const citiesSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: {
    type: String,
    required: true,
    validate: firstCapitalValidator
  },
  country: {
    type: String,
    required: true,
    validate: firstCapitalValidator
  },
  capital: {
    type: String,
    required: true,
    validate: firstCapitalValidator
  },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  lastModifiedDate: Date
});

citiesSchema.pre('update', function(next) {
  this.lastModifiedDate = new Date();
  next();
});
citiesSchema.pre('save', function(next) {
  this.lastModifiedDate = new Date();
  next();
});

const Cities = connection.model('cities', citiesSchema);

module.exports = Cities;
