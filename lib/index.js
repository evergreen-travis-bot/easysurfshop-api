'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.sails = {
    used: client.bind(client, {path: 'windsurfing-2ndhand-sails'}),
    new: client.bind(client, {path: 'windsurfing-sails'})
  }

  client.boards = {
    used: client.bind(client, {path: 'windsurfing-2ndhand-boards'}),
    new: client.bind(client, {path: 'windsurfing-boards'})
  }

  client.booms = {
    used: client.bind(client, {path: 'windsurfing-2ndhand-booms'}),
    new: client.bind(client, {path: 'windsurfing-booms'})
  }

  client.masts = {
    used: client.bind(client, {path: 'windsurfing-2ndhand-masts'}),
    new: client.bind(client, {path: 'windsurfing-masts'})
  }

  client.accesories = {
    used: client.bind(client, {path: 'windsurfing-2ndhand-accesories'}),
    new: client.bind(client, {path: 'windsurfing-accesories'})
  }

  return client
}

module.exports = createClient
