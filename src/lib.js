'use strict';

const path = require('path');
const _ = {
  mergeWith: require('lodash.mergewith'),
};

module.exports = opts => {
  if (typeof opts === 'string') {
    opts = { environment: opts };
  } else if (Array.isArray(opts)) {
    opts = { filenames: opts };
  }
  opts = opts || {};
  opts.environment = opts.environment || process.env.NODE_ENV || 'development';
  opts.filenames = opts.filenames || [];

  let filenames = ['all'];
  if (opts.environment === 'development') {
    filenames.push('development');
  }
  filenames = filenames.concat(opts.filenames);
  filenames.push('properties');

  const directory = path.join(process.cwd(), 'config');
  let config = {};
  for (const filename of filenames) {
    for (const fileformat of ['.json', '.js']) {
      try {
        _.mergeWith(
          config,
          require(path.join(directory, filename + fileformat)),
          (objValue, srcValue) => {
            if (Array.isArray(srcValue)) {
              return srcValue;
            }
          }
        );
      } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
          throw e;
        }
      }
    }
  }

  Object.assign(config, { environment: opts.environment });

  return config;
};
