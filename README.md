# Description

Files which will be required:

* If environment is undefined or 'development':
    1. `/config/all.json`
    2. `/config/development.json`
    3. `/config/properties.json`
* Else:
    1. `/config/all.json`
    2. `/config/properties.json`
  
The later required files overwrites the others. If an attribute is defined, the complete tree will be overwritten.

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
const config = require('mxd-config')(['lambda.json']);
```

If both (environment and additional filenames) are needed, use a config object: 
```
const config = require('mxd-config')({ 
  environment: 'development',
  filenames: ['lambda.json'], 
});
```
