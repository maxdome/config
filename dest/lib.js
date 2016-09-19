'use strict';

const path = require('path');

module.exports = environment => {
  let filenames;
  if (environment === 'development') {
    filenames = ['all.json', 'development.json', 'properties.json'];
  } else {
    filenames = ['all.json', 'properties.json'];
  }

  const directory = path.join(process.cwd(), 'config');
  let config = {};
  for (const filename of filenames) {
    try {
      Object.assign(config, require(path.join(directory, filename)));
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
      }
    }
  }

  Object.assign(config, { environment: environment });

  return config;
};