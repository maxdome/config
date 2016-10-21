'use strict';

const path = require('path');

module.exports = opts => {
  if (typeof opts === 'string') {
    opts = { environment: opts };
  } else {
    opts = opts || {};
    opts.environment = opts.environment || process.env.NODE_ENV || 'development';
  }
  opts.filenames = opts.filenames || [];

  let filenames = ['all.json'];
  if (opts.environment === 'development') {
    filenames.push('development.json');
  }
  filenames = filenames.concat(opts.filenames);
  filenames.push('properties.json');

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

  Object.assign(config, { environment: opts.environment });

  return config;
};
