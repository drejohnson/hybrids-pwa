const path = require('path');
const fs = require('fs-extra');
const config = require('./config');

const copy = (path, dest) => {
  fs.copySync(config.resolveApp(path), config.resolveApp(dest), {
    dereference: true,
    filter: file => file !== config.resolveApp('public/index.html')
  });
};

copy('public', 'dist');
