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
PeerStoreWorker.prototype.peerDatatypes = function () {
  // read
  console.log('peer data datype query')
  // get a log entry and return
  this.datastore.list( { ifAvailable: true }, (err, content) => {
    console.log('contentlists')
    console.log(content)
  })

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
  this.datastore
  return true
}

module.exports = PeerStoreWorker;
