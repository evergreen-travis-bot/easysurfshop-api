'use strict'

const reduce = require('lodash.reduce')
const normalize = require('./normalize')

function getItem (item) {
  const normalizedItem = normalize(item)
  const {name, image, link} = normalizedItem
  const price = normalizedItem.newPrice || normalizedItem.price
  if (!price) return

  const title = `${name} €${price}`

  return {
    title,
    name,
    image,
    link,
    price
  }
}

function getItems (collection) {
  const addItem = (acc, item) => {
    const newItem = getItem(item)
    if (newItem) acc.push(newItem)
    return acc
  }

  return reduce(collection, addItem, [])
}
module.exports = getItems
module.exports.getItems = getItems
module.exports.getItem = getItem
