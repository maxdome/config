'use strict';

const dotenv = require('dotenv');
const path = require('path');
const util = require('./util');
const _ = {
  get: require('lodash.get'),
  has: require('lodash.has'),
  mergeWith: require('lodash.mergewith')
};

module.exports = opts => {
  if (typeof opts === 'string') {
    opts = { environment: opts };
  } else if (Array.isArray(opts)) {
    opts = { filenames: opts };
  }
  opts = opts || {};
  opts.environment = opts.environment || process.env.NODE_ENV || 'development';
  opts.debug = opts.debug || opts.environment === 'development';
  opts.filenames = opts.filenames || [];

  dotenv.config({ path: path.join(process.cwd(), '.env'), silent: true }); // Local development override
  dotenv.config({ path: path.join(process.cwd(), `.env.${opts.environment}`), silent: true });

  let filenames = ['all'];
  if (opts.environment === 'development') {
    filenames.push('development');
  }
  filenames = filenames.concat(opts.filenames);
  filenames.push('properties');

  const directory = path.join(process.cwd(), 'config');
  let config = {
    environment: opts.environment,
    debug: opts.debug
  };
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

  config.get = (key) => {
    if (_.has(config, key)) {
      return _.get(config, key);
    }
    throw new Error(`Config key "${key}" not found.`);
  };

  return config;
};

module.exports.util = util;
