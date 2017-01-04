# Description

Files which will be required (all files can be defined as JSON and .js CommonJS module):

* If environment is undefined or 'development':
    1. `/config/all`
    2. `/config/development`
    3. `/config/properties`
* Else:
    1. `/config/all`
    2. `/config/properties`
  
The later required files overwrites the others. If an attribute is defined as array, the complete attribute will be overwritten.

# Example

```
const config = require('mxd-config')();
// if the environment is later needed use 'config.environment' 
```

## Configuration

The environment will be defined by `NODE_ENV` but can be overwritten:
```
const config = require('mxd-config')('development');
```

Additional filenames (located in the config directory) can be defined, which also will be loaded:
```
const config = require('mxd-config')(['lambda']);
```

If both (environment and additional filenames) are needed, use a config object: 
```
const config = require('mxd-config')({ 
  environment: 'development',
  filenames: ['lambda'], 
});
```
