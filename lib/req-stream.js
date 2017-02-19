'use strict'

const from = require('from2').obj
const got = require('got')

const CONST = require('./constants')
const mapper = require('./mapper')

const fetch = (opts) => got.get(CONST.ENDPOINT, opts)

const DEFAULT = {
  itemsPerPage: 10000
}

function createStream (opts) {
  const {
    key: wrapAPIKey,
    itemsPerPage = DEFAULT.itemsPerPage
  } = opts

  function reqStream (query) {
    Object.assign(query, {itemsPerPage, wrapAPIKey})
    const fetchOpts = {json: true, query}
    let itemsFetched = false
    const hasFetch = () => !itemsFetched

    const stream = from(function (size, next) {
      if (!hasFetch()) return next(null, null)

      fetch(fetchOpts)
        .then(res => {
          const {body} = res
          if (!body.success) return next(body.messages)

          const rawItems = body.data.items
          if (!rawItems || !rawItems.length) return next(null, null)

          const items = mapper(rawItems)
          const lastItem = items.pop()
          items.forEach(item => this.push(item))
          itemsFetched = true
          next(null, lastItem)
          if (items.length < itemsPerPage) next(null, null)
        })
        .catch(next)
    })

    return stream
  }

  return reqStream
}

module.exports = createStream
