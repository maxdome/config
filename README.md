# Description

Files which will be required:

* If environment is 'development':
  1. /config/all.json
  2. /config/development.json
  3. /config/properties.json
* Else:
  1. /config/all.json
  2. /config/properties.json
  
The later required files overwrites the others. If an attribute is defined, the complete tree will be overwritten.

# Example

```
const config = require('mxd-config')(process.env.NODE_ENV || 'development');
// if the environment is later needed use config.environment 
```
