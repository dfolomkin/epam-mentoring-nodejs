'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showHelp = function showHelp() {
  console.log('');
  console.log('Usage: streams [options]');
  console.log('');
  console.log('Options:');
  console.log('  -a, --action <actionName>  Call action');
  console.log('  -f, --file <fileName>      Point file for action');
  console.log('  -h, --help                 output usage information');
};

var showNoFileDisclaimer = function showNoFileDisclaimer() {
  return console.log('Err: File name was not pointed. Add --file=filename.ext into command.');
};

var showNoPathDisclaimer = function showNoPathDisclaimer() {
  return console.log('Err: Path was not pointed. Add --path=foldername into command.');
};

process.stdin.setEncoding('utf8');

var reverse = function reverse() {
  process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      var reversedChunk = chunk.split('').reverse().join('');
      process.stdout.write(reversedChunk);
    }
  });
};

var transform = function transform() {
  process.stdin.pipe((0, _through2.default)(function (chunk, enc, next) {
    this.push(chunk.toString().toUpperCase());
    next();
  })).pipe(process.stdout);
};

var outputFile = function outputFile(path) {
  var fullPath = _path2.default.resolve('./', path);

  if (!_fs2.default.existsSync(fullPath)) {
    console.log('Err: Passed file does not exist.');
  } else {
    _fs2.default.createReadStream(fullPath).pipe(process.stdout);
  }
};

var convertFromFile = function convertFromFile(path) {
  var fullPath = _path2.default.resolve('./', path);

  if (!_fs2.default.existsSync(fullPath)) {
    console.log('Err: Passed file does not exist.');
    return;
  }

  var parser = (0, _csvParse2.default)({ columns: true, delimiter: ';' });
  var transformer = (0, _through2.default)({ objectMode: true }, function (chunk, enc, next) {
    this.push(JSON.stringify(chunk) + '\n');
    next();
  });

  _fs2.default.createReadStream(_path2.default.resolve('./', 'data', fullPath)).pipe(parser).pipe(transformer).pipe(process.stdout);
};

var convertToFile = function convertToFile(path) {
  var fullPath = _path2.default.resolve('./', path);

  if (!_fs2.default.existsSync(fullPath)) {
    console.log('Err: Passed file does not exist.');
    return;
  }

  var parser = (0, _csvParse2.default)({ columns: true, delimiter: ';' });
  var transformer = (0, _through2.default)({ objectMode: true }, function (chunk, enc, next) {
    this.push(JSON.stringify(chunk) + '\n');
    next();
  });

  var jsonPath = path.match(/.+\./)[0] + 'json';
  var writer = _fs2.default.createWriteStream(_path2.default.resolve('./', jsonPath));

  _fs2.default.createReadStream(fullPath).pipe(parser).pipe(transformer).pipe(writer);
};

var cssBundler = function cssBundler(path) {
  var fullPath = _path2.default.resolve('./', path);

  if (!_fs2.default.existsSync(fullPath)) {
    console.log('Err: Passed folder does not exist.');
    return;
  }

  var files = _fs2.default.readdirSync(fullPath);
  if (!files.length) {
    console.log('Err: Passed folder is empty.');
    return;
  }

  var cssFiles = files.filter(function (item) {
    return item.match(/.+\.css/);
  }).filter(function (item) {
    return item !== 'nodejs-homework3.css';
  }).concat('nodejs-homework3.css');

  var transformer = (0, _through2.default)(function (chunk, enc, next) {
    this.push(chunk.toString() + '\n');
    next();
  });

  cssFiles.forEach(function (item) {
    _fs2.default.createReadStream(_path2.default.resolve('./', path, item)).pipe(transformer).pipe(_fs2.default.createWriteStream(_path2.default.resolve('./', path, 'bundle.css')));
  });
};

_commander2.default.version('0.1.0').allowUnknownOption().option('-a, --action <actionName>', 'Call action').option('-f, --file <fileName>', 'Point file for action').option('-p, --path <folder>', 'Point folder for action').option('-h, --help', 'Call custom help').parse(process.argv);

var options = _commander2.default.rawArgs.filter(function (item) {
  return item.match(/--.+=/) || item.match(/--.+/) || item.match(/-.=/) || item.match(/-./);
}).map(function (item) {
  return item.match(/[a-zA-Z0-9]+/)[0];
}).filter(function (item) {
  return item !== 'C';
});

var safeCall = function safeCall(func, arg) {
  if (!arg) {
    showNoFileDisclaimer();
    return;
  }

  func(arg);
};

if (options[0] === 'help' || options[0] === 'h' || options.length === 0) {
  showHelp();
} else if (_commander2.default.action) {
  switch (_commander2.default.action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      transform();
      break;
    case 'outputFile':
      safeCall(outputFile, _commander2.default.file);
      break;
    case 'convertFromFile':
      safeCall(convertFromFile, _commander2.default.file);
      break;
    case 'convertToFile':
      safeCall(convertToFile, _commander2.default.file);
      break;
    case 'cssBundler':
      safeCall(cssBundler, _commander2.default.path);
      break;
    default:
      showHelp();
  }
}
