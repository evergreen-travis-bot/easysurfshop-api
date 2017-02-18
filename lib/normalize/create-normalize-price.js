'use strict'

const parsePrice = require('parse-price')

function createNormalizePrice (prop) {
  function normalizePrice (item) {
    const price = item[prop]
    if (!price) return
    return Math.trunc(parsePrice(price))
  }

  return normalizePrice
}

module.exports = createNormalizePrice
