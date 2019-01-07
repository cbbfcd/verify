# verify

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/alexjoverm/typescript-library-starter.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/cbbfcd/verify.svg?branch=master)](https://travis-ci.org/cbbfcd/verify)
[![Coverage Status](https://coveralls.io/repos/github/cbbfcd/fire/badge.svg)](https://coveralls.io/github/cbbfcd/fire)

> a simple type checking tool with TypeScript

## Useage

```js
npm install verify -D
// or
yarn install verify --dev

import verify from 'verfify'
```

## API

> Still in the process of replenishment, so the API is messy and there is no time to sort it out. Follow-up will organize the structure

> more case can found in ./test/verify.test.ts

### 1. verify.isString(input: any)

return true if the input is a string. otherwise return false instead.

### 2. verify.isArray(input: any)

return true if the input is an array. otherwise return false instead.

### 3. verify.isDate(input: any)

return true if the input is a date. otherwise return false instead.

### 4. verify.isNumber(input: any)

return true if the input is a number. otherwise return false instead.

### 5. verify.isInfinity(input: any)

return true if the input is a infinity. otherwise return false instead.

### 6. verify.isBoolean(input: any)

return true if the input is a boolean. otherwise return false instead.

### 7. verify.isError(input: any)

return true if the input is a error object. otherwise return false instead.

### 8. verify.isRegExp(input: any)

return true if the input is a regexp object. otherwise return false instead.

### 9. verify.isObject(input: any)

return true if the input is an object. otherwise return false instead.

### 10. verify.isFunction(input: any)

return true if the input is a Function/AsyncFunction/GeneratorFunction. otherwise return false instead.

### 11. verify.isPlainObject(input: any)

return true if the input is a plain object. otherwise return false instead.

### 12. verify.isDomNode(input: any)

return true if the input is a dom node. otherwise return false instead.

### 13. verify.isNull(input: any)

return true if the input is null. otherwise return false instead.

### 14. verify.isUndefined(input: any)

return true if the input is undefined. otherwise return false instead.

### 15. verify.isJsonStr(input: any)

return true if the input is standard json str. otherwise return false instead.

### 16. verify.isNaN(input: any)

return true if the input is NaN. otherwise return false instead.

### 17. verify.isUrl(input: any)

return true if the input is an url. otherwise return false instead.

### 18. verify.isNullOrUndefined(input: any)

return true if the input is null or undefined. otherwise return false instead.

