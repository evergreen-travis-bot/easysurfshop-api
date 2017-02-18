# easysurfshop-api

![Last version](https://img.shields.io/github/tag/Kikobeats/easysurfshop-api.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/easysurfshop-api/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/easysurfshop-api)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/easysurfshop-api.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/easysurfshop-api)
[![Dependency status](http://img.shields.io/david/Kikobeats/easysurfshop-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/easysurfshop-api)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/easysurfshop-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/easysurfshop-api#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/easysurfshop-api.svg?style=flat-square)](https://www.npmjs.org/package/easysurfshop-api)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Programatic API access for easy-surfshop.com

## Install

```bash
$ npm install easysurfshop-api --save
```

## Usage

```js
const easysurfshop = require('easysurfshop-api')

const stream = easysurfshop({
  key: process.env.API_KEY, // API Key credentials
  itemsPerPage: 10000 // Number of items per page [default=10000]
})
```

## License

MIT © [Kiko Beats](http://kikobeats.com)
