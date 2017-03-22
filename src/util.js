'use strict';

const util = module.exports = {
  getEnv(key, defaultValue) {
    if (!key) {
      throw new Error('No env variable given');
    }
    const val = process.env[key];
    if (!val && defaultValue === undefined) {
      throw new Error(`Env variable "${key}" does not exist and no default value was given.`);
    }
    return val || defaultValue;
  },

  getStr(key, defaultValue) {
    return util.getEnv(key, defaultValue);
  },

  getInt(key, defaultValue) {
    return parseInt(util.getEnv(key, defaultValue), 10);
  },

  getBool(key, defaultValue) {
    return [true, 'true', 'on', 'enabled', '1'].indexOf(util.getEnv(key, defaultValue)) > -1;
  },

  getList(key, defaultValue = [], separator) {
    const val = util.getEnv(key, defaultValue);
    if (typeof val === 'string') {
      return val.split(separator || '|');
    }
    return val;
  }
};
