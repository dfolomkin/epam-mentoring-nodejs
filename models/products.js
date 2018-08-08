const Schema = require('mongoose').Schema;

const connection = require('./connection');
const firstCapitalValidator = require('./validators').firstCapital;

const productsSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: {
    type: String,
    required: true,
    validate: firstCapitalValidator
  },
  reviews: [
    {
      id: Number,
      date: Date
    }
  ],
  lastModifiedDate: Date
});

productsSchema.pre('save', function(next) {
  this.lastModifiedDate = new Date();
  next();
});

const Products = connection.model('products', productsSchema);

module.exports = Products;
