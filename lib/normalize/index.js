'use strict'

const condenseWhitespace = require('condense-whitespace')
const reduce = require('lodash.reduce')
const url = require('url')

const createNormalizePrice = require('./create-normalize-price')

const CLEAR_TITLE = /\[(?:ex.?exhibition|used)]/ig
const URL = 'https://easy-surfshop.com/'

const transform = {
  price: createNormalizePrice('price'),
  name: (item) => condenseWhitespace(item.name.replace(CLEAR_TITLE, '').trim()),
  link: (item) => url.resolve(URL, item.link)
}

function normalize (item) {
  const normalizedItem = reduce(transform, function (acc, value, key) {
    const fn = transform[key]
    if (item[key]) acc[key] = fn(item)
    return acc
  }, {})
  return Object.assign({}, item, normalizedItem)
}

module.exports = normalize
