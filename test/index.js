'use strict'

const isAbsoluteUrl = require('is-absolute-url')
require('should')

const createClient = require('..')
const env = process.env.NODE_ENV || 'development'
const log = env === 'development' ? console.log : function () {}

describe('easysurfshop-api', function () {
  const client = createClient({
    key: process.env.API_KEY
  })

  const stream = client.booms.used()
  let count = 0
  let buffer = []

  it('fetch data', function (done) {
    stream.on('data', function (item) {
      log(++count, item)
      buffer.push(item)
    })

    stream.on('error', done)

    stream.on('end', function () {
      (count > 1).should.be.true()

      buffer.forEach(item => {
        describe(`${item.title}`, function () {
          item.should.be.an.Object()

          describe('url', function () {
            ;[
              'link',
              'image'
            ].forEach(function (prop) {
              it(prop, () => isAbsoluteUrl(item[prop]).should.be.true())
            })
          })

          describe('rest of props', function () {
            it('name', () => item.name.should.be.an.String())
            it('price', () => item.price.should.be.a.Number())
          })
        })
      })
      done()
    })
  })
})
