const Logins = require('./models').Logins;
const Products = require('./models').Products;
const Users = require('./models').Users;

const loginsData = require('./data').logins;
const productsData = require('./data').products;
const usersData = require('./data').users;

Logins.insertMany(loginsData);
Products.insertMany(productsData);
Users.insertMany(usersData);
