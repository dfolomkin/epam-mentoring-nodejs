import program from 'commander';
import fs from 'fs';
import p from 'path';
import parse from 'csv-parse';
import through2 from 'through2';

const showHelp = () => {
  console.log('');
  console.log('Usage: streams [options]');
  console.log('');
  console.log('Options:');
  console.log('  -a, --action <actionName>  Call action');
  console.log('  -f, --file <fileName>      Point file for action');
  console.log('  -h, --help                 output usage information');
};

const showNoFileDisclaimer = () =>
  console.log(
    'Err: File name was not pointed. Add --file=filename.ext into command.'
  );

const showNoPathDisclaimer = () =>
  console.log('Err: Path was not pointed. Add --path=foldername into command.');

process.stdin.setEncoding('utf8');

const reverse = () => {
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      const reversedChunk = chunk
        .split('')
        .reverse()
        .join('');
      process.stdout.write(reversedChunk);
    }
  });
};

const transform = () => {
  process.stdin
    .pipe(
      through2(function(chunk, enc, next) {
        this.push(chunk.toString().toUpperCase());
        next();
      })
    )
    .pipe(process.stdout);
};

const outputFile = path => {
  const fullPath = p.resolve('./', path);

  if (!fs.existsSync(fullPath)) {
    console.log('Err: Passed file does not exist.');
  } else {
    fs.createReadStream(fullPath).pipe(process.stdout);
  }
};

const convertFromFile = path => {
  const fullPath = p.resolve('./', path);

  if (!fs.existsSync(fullPath)) {
    console.log('Err: Passed file does not exist.');
    return;
  }

  const parser = parse({ columns: true, delimiter: ';' });
  const transformer = through2({ objectMode: true }, function(
    chunk,
    enc,
    next
  ) {
    this.push(JSON.stringify(chunk) + '\n');
    next();
  });

  fs
    .createReadStream(p.resolve('./', 'data', fullPath))
    .pipe(parser)
    .pipe(transformer)
    .pipe(process.stdout);
};

const convertToFile = path => {
  const fullPath = p.resolve('./', path);

  if (!fs.existsSync(fullPath)) {
    console.log('Err: Passed file does not exist.');
    return;
  }

  const parser = parse({ columns: true, delimiter: ';' });
  const transformer = through2({ objectMode: true }, function(
    chunk,
    enc,
    next
  ) {
    this.push(JSON.stringify(chunk) + '\n');
    next();
  });

  const jsonPath = path.match(/.+\./)[0] + 'json';
  const writer = fs.createWriteStream(p.resolve('./', jsonPath));

  fs
    .createReadStream(fullPath)
    .pipe(parser)
    .pipe(transformer)
    .pipe(writer);
};

const cssBundler = path => {
  const fullPath = p.resolve('./', path);

  if (!fs.existsSync(fullPath)) {
    console.log('Err: Passed folder does not exist.');
    return;
  }

  const files = fs.readdirSync(fullPath);
  if (!files.length) {
    console.log('Err: Passed folder is empty.');
    return;
  }

  const cssFiles = files
    .filter(item => item.match(/.+\.css/))
    .filter(item => item !== 'nodejs-homework3.css')
    .concat('nodejs-homework3.css');

  const transformer = through2(function(chunk, enc, next) {
    this.push(chunk.toString() + '\n');
    next();
  });

  cssFiles.forEach(item => {
    fs
      .createReadStream(p.resolve('./', path, item))
      .pipe(transformer)
      .pipe(fs.createWriteStream(p.resolve('./', path, 'bundle.css')));
  });
};

program
  .version('0.1.0')
  .allowUnknownOption()
  .option('-a, --action <actionName>', 'Call action')
  .option('-f, --file <fileName>', 'Point file for action')
  .option('-p, --path <folder>', 'Point folder for action')
  .option('-h, --help', 'Call custom help')
  .parse(process.argv);

const options = program.rawArgs
  .filter(
    item =>
      item.match(/--.+=/) ||
      item.match(/--.+/) ||
      item.match(/-.=/) ||
      item.match(/-./)
  )
  .map(item => item.match(/[a-zA-Z0-9]+/)[0])
  .filter(item => item !== 'C');

const safeCall = (func, arg) => {
  if (!arg) {
    showNoFileDisclaimer();
    return;
  }

  func(arg);
};

if (options[0] === 'help' || options[0] === 'h' || options.length === 0) {
  showHelp();
} else if (program.action) {
  switch (program.action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      transform();
      break;
    case 'outputFile':
      safeCall(outputFile, program.file);
      break;
    case 'convertFromFile':
      safeCall(convertFromFile, program.file);
      break;
    case 'convertToFile':
      safeCall(convertToFile, program.file);
      break;
    case 'cssBundler':
      safeCall(cssBundler, program.path);
      break;
    default:
      showHelp();
  }
}
