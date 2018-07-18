const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const random = require('lodash').random;

const url = 'mongodb://localhost:27017';

http
  .createServer()
  .on('request', (req, res) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          res.writeHead(500);
          res.end(err.toString());
        } else {
          const db = client.db('hw7-db');
          db.collection('cities')
            .findOne({ id: random(1, 3) })
            .then(city => {
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(city));
            });
          client.close();
        }
      }
    );
  })
  .listen(3000);
