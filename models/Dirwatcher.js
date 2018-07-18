import fs from 'fs';
import p from 'path';
import { isEmpty, difference } from 'lodash';

export class DirWatcher {
  constructor() {
    this.dirState = [];
    this.emitter = null;
  }

  setEmitter(emitter) {
    this.emitter = emitter;
  }

  watch(path, delay) {
    const dir = p.resolve('./', path);

    if (!fs.existsSync(dir)) {
      console.log('path does not exist!');
    } else {
      this.interval = setInterval(() => {
        const dirContent = fs.readdirSync(dir);
        const diff = difference(
          dirContent,
          this.dirState.map(item => item.fileName)
        );

        // emit if new files have appeared
        if (!isEmpty(diff)) {
          this.emitter.emit(
            'dirwatcher:changed',
            diff.map(item => p.resolve(dir, item))
          );
        }

        // emit if existing files have been modified
        dirContent.forEach(item => {
          const fullName = p.resolve(dir, item);
          const fd = fs.openSync(fullName, 'r');
          const modTime = fs.fstatSync(fd).mtimeMs;
          fs.closeSync(fd);

          const stateRecord = this.dirState.find(
            record => record.fileName === item
          );
          const stateModTime = stateRecord && stateRecord.modTime;

          if (stateModTime && modTime !== stateModTime) {
            this.emitter.emit('dirwatcher:changed', new Array(fullName));
          }
        });

        // renew state
        this.dirState = dirContent.map(fileName => {
          const fd = fs.openSync(p.resolve(dir, fileName), 'r');
          const modTime = fs.fstatSync(fd).mtimeMs;
          fs.closeSync(fd);

          return { fileName, modTime };
        });
      }, delay);
    }
  }

  unwatch() {
    clearInterval(this.interval);
  }
}
