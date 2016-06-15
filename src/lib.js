'use strict';

module.exports = (config) => {
  try {
    Object.assign(config, require(process.cwd() + '/config/properties.json'));
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
  if (process.env.PORT) {
    config.port = process.env.PORT;
  }
};
