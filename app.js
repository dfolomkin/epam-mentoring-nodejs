import { DirWatcher, Importer, emitter } from './models';

const watcher = new DirWatcher();
watcher.setEmitter(emitter);
watcher.watch('data', 1000);

const importer = new Importer();
importer.subscribe(emitter);

// async load
emitter.on('importer:loaded', data => console.log('new data: ', data));

// sync load
emitter.on('importerSync:loaded', data => console.log('new sync data: ', data));
