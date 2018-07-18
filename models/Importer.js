import fs, { openSync } from 'fs';
import p from 'path';
import parse from 'csv-parse';
import parseSync from 'csv-parse/lib/sync';

export class Importer {
  subscribe(emitter) {
    emitter.on('dirwatcher:changed', diff => {
      if (diff.length > 0) {
        diff.forEach(item => {
          this.import(item).then(data => {
            emitter.emit('importer:loaded', { file: item, data });
          });
          emitter.emit('importerSync:loaded', {
            file: item,
            data: this.importSync(item)
          });
        });
      }
    });
  }

  import(path) {
    return new Promise((resolve, reject) => {
      const parser = parse({ columns: true, delimiter: ';' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

      fs.createReadStream(path).pipe(parser);
    });
  }

  importSync(path) {
    const file = fs.readFileSync(path);

    return parseSync(file, { columns: true, delimiter: ';' });
  }
}
