'use strict'
/**
*  KBL database utility
*
*
* @class xlibraryUtility
* @package    KBL data store
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')
const axios = require('axios')

var xlibraryUtility = function (setUP) {
  events.EventEmitter.call(this)
  this.baseAPI = 'http://165.227.244.213:8778'
  this.tempPubkey = setUP.publickey
  this.tempToken = setUP.token
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(xlibraryUtility, events.EventEmitter)

/**
*  Get NXP index for those peer has joind i.e. genesis index entry
* @method getNXPindex
*
*/
xlibraryUtility.prototype.getNXPindex = async function (status, n) {
  //  nosql query
  let jsondata = await axios.get(this.baseAPI + '/nxpindex/' + this.tempPubkey + '/' + this.tempToken + '/' + status + '/' + n)
  return jsondata.data
}

/**
*  peerNXPmodules contract
* @method peerNXPmodules
*
*/
xlibraryUtility.prototype.peerModules = async function (contractID) {
  let startSettings = await axios.get(this.baseAPI + '/modules/' + this.tempPubkey + '/' + this.tempToken + '/' + contractID)
  return startSettings.data[0]
}

/**
*  newVerionContract
* @method newVerionContract
*
*/
xlibraryUtility.prototype.newVerionContract = async function (contractID) {
  let messageBack = {}
  await axios.post(this.baseAPI + '/modulesave/' + this.tempPubkey + '/' + this.tempToken, contractID)
    .then(function (response) {
      messageBack = response
    })
  return message
}

export default xlibraryUtility
