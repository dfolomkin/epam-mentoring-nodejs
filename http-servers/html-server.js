const http = require('http');
const fs = require('fs');
const p = require('path');
const through2 = require('through2');

const message = 'This is HTML-Server!';

const reader = fs.createReadStream(p.resolve('./', 'views/index.html'));

const transformer = through2(function(chunk, enc, next) {
  this.push(chunk.toString().replace(/{message}/, message));
  next();
});

http
  .createServer()
  .on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    reader.pipe(transformer).pipe(res);
  })
  .listen(3000);
