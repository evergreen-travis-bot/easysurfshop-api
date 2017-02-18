'use strict'

const should = require('should')
const {getItem, getItems} = require('../lib/mapper')

function getFixture () {
  return [
    {
      image: 'https://images.easy-surfshop.com/images/_small/U00256.jpg',
      name: 'GAASTRA IQ 5.3 2011 [USED] Windsurf Sail',
      link: 'do/item/U00256/GAASTRA-IQ-5.3-2011-USED-Windsurf-Sail',
      price: '125.00 €'
    },
    {
      image: 'https://images.easy-surfshop.com/images/_small/U00481.jpg',
      name: 'GA-SAILS Windsurf sail IQ 5.4 2016 [EX-EXHIBITION]',
      link: 'do/item/U00481/GA-SAILS-Windsurf-sail-IQ-5.4-2016-EX-EXHIBITION',
      price: '399.00 €'
    },
    {
      image: 'https://images.easy-surfshop.com/images/_small/U00481.jpg',
      name: 'GA-SAILS Windsurf sail IQ 5.4 2016 [EX-EXHIBITION]',
      link: 'do/item/U00481/GA-SAILS-Windsurf-sail-IQ-5.4-2016-EX-EXHIBITION',
      price: null
    }
  ]
}

describe('easysurfshop-api » mapper', function () {
  describe('.getItem', function () {
    it('price is a number', function () {
      const fixture = getFixture()[0]
      const item = getItem(fixture)
      should(item.price).be.equal(125)
    })

    describe('extract backlist keywords from name', function () {
      it('[USED]', function () {
        const fixture = getFixture()[0]
        const item = getItem(fixture)
        should(item.name).be.equal('GAASTRA IQ 5.3 2011 Windsurf Sail')
      })

      it('[EX-EXHIBITION]', function () {
        const fixture = getFixture()[1]
        const item = getItem(fixture)
        should(item.name).be.equal('GA-SAILS Windsurf sail IQ 5.4 2016')
      })
    })

    it('compose title using name and price', function () {
      const fixture = getFixture()[0]
      const item = getItem(fixture)
      should(item.title).be.equal('GAASTRA IQ 5.3 2011 Windsurf Sail €125')
    })

    it('absolute link', function () {
      const fixture = getFixture()[0]
      const item = getItem(fixture)
      const expected = 'https://easy-surfshop.com/do/item/U00256/GAASTRA-IQ-5.3-2011-USED-Windsurf-Sail'
      should(item.link).be.equal(expected)
    })

    it('exclude items without price', function () {
      const fixture = getFixture()[2]
      const item = getItem(fixture)
      should(item).be.undefined()
    })
  })

  describe('.getItems', function () {
    it('iterate a collection', function () {
      const fixture = getFixture()
      const items = getItems(fixture)

      should(items).be.eql([{
        image: 'https://images.easy-surfshop.com/images/_small/U00256.jpg',
        name: 'GAASTRA IQ 5.3 2011 Windsurf Sail',
        link: 'https://easy-surfshop.com/do/item/U00256/GAASTRA-IQ-5.3-2011-USED-Windsurf-Sail',
        title: 'GAASTRA IQ 5.3 2011 Windsurf Sail €125',
        price: 125
      }, {
        image: 'https://images.easy-surfshop.com/images/_small/U00481.jpg',
        name: 'GA-SAILS Windsurf sail IQ 5.4 2016',
        link: 'https://easy-surfshop.com/do/item/U00481/GA-SAILS-Windsurf-sail-IQ-5.4-2016-EX-EXHIBITION',
        title: 'GA-SAILS Windsurf sail IQ 5.4 2016 €399',
        price: 399
      }])
    })
  })
})
