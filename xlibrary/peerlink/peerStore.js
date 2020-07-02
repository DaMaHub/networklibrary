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

var PeerStoreWorker = function (store) {
  events.EventEmitter.call(this)
  this.datastore = store
  this.listdata = []
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(PeerStoreWorker, events.EventEmitter)

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

module.exports = PeerStoreWorker;
