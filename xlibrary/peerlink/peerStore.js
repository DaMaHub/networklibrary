'use strict'
/**
*  PeerStoreWorker
*
*
* @class PeerStoreWorker
* @package    safeFlow
* @copyright  Copyright (c) 2019 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var PeerStoreWorker = function (store, swarm) {
  events.EventEmitter.call(this)
  this.datastore = store
  this.dataswarm = swarm
  this.listdata = []
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(PeerStoreWorker, events.EventEmitter)

/**
* return public key for datastore
* @method getPrivatekey
*
*/
PeerStoreWorker.prototype.getPrivatekey = function (callback) {
  let pubkey = ''
  this.datastore.ready(() => {
    console.log('get public key datastore or share')
    console.log(this.datastore.key)
    pubkey = this.datastore.key.toString('hex')
    console.log('internal')
    console.log(pubkey)
    callback(pubkey)
  })
}

/**
* filter by Peer datatypes
* @method peerKBLstart
*
*/
PeerStoreWorker.prototype.peerGETRefContracts = function (getType, callback) {
  // read
  console.log('peer data datype query')
  let databack = this.datastore.list( { ifAvailable: true }, callback)
  return true
}

/**
* save new Reference Contract
* @method peerStoreRefContract
*
*/
PeerStoreWorker.prototype.peerStoreRefContract = function (refContract) {
  // save
  console.log('save new Ref Contract')
  console.log(refContract)
  const localthis = this
  this.datastore.put(refContract.hash, refContract.contract, function () {
    console.log('saved hypertrie OK')
    localthis.datastore.get(refContract.hash, console.log)
  })
  return { stored: true }
}

/**
* replicate an explicit peer ref contract datastore
* @method peerRefContractReplicate
*
*/
PeerStoreWorker.prototype.peerRefContractReplicate = function (refContract) {
  // replicate
  this.datastore.ready(() => {
    console.log('ready to do replication?')
    this.dataswarm.on('connection', function (socket, details) {
      console.log('swarm connect peer')
      // socket.write('three jioned')
      pump(socket, this.datastore.replicate(false, { live: true }), socket)
    })
  })
}

module.exports = PeerStoreWorker;
