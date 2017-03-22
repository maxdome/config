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

## dotenv

This module silently loads `/.env.<NODE_ENV>` configs in the project root, e.g. `/.env.production` if one is found.
As a result, we can simply start the app using `NODE_ENV=test node app.js` which loads `/.env.test` into the config. 

For development purposes, the module also silently loads a "generic" `/.env`, config regardless of the environment.
The variables contained here override those in `/.env.<NODE_ENV>`.

## Environment Getters

Using environment getters, we can get environment variables and cast a type and a default value on them:

```
const { getBool, getInt, getList, getStr } = require('mxd-config').util;

module.exports = {
  myBool: getBool('MY_BOOL', true),
  myInteger: getInt('MY_INT', 123),
  myString: getStr('MY_STRING', 'foo'),
  myList: getList('MY_LIST', ['foo', 'bar', 'baz'])
};
```

With no environment variables set, this outputs

```
{
  myBool: true,
  myInteger: 123,
  myString: 'foo',
  myList: ['foo', 'bar', 'baz']
}
```

Here's an example `.env.development` file:

```
MY_BOOL=off
MY_INT=456
MY_STRING=bar
MY_LIST=baz|bar|foo
```

This outputs

```
{
  myBool: false,
  myInteger: 456,
  myString: 'bar',
  myList: ['baz', 'bar', 'foo']
}
```
