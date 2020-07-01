'use strict'
/**
*  Prepare Reference Contracts
*
*
* @class ReferenceContractComposer
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from './cryptoUtility.js'
const util = require('util')
const events = require('events')

var ReferenceContractComposer = function () {
  events.EventEmitter.call(this)
  console.log('ref contract composer live')
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ReferenceContractComposer, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method dataTypePrepare
*
*/
ReferenceContractComposer.prototype.dataTypePrepare = function (inputRC) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'datatype'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'datatype'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* prepare a datatype reference contract
* @method packagingPrepare
*
*/
ReferenceContractComposer.prototype.packagingPrepare = function (inputRC) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'packaging'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'packaging'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* seperate reference contracts by contract type
* @method refcontractSperate
*
*/
ReferenceContractComposer.prototype.refcontractSperate = function (refContractsList) {
  console.log('seperate out the reference contracts')
  console.log(refContractsList)
  const refContractHolder = {}
  const datatypeList = []
  const unitsList = []
  const computeList = []
  const packagingList = []
  for (const rc of refContractsList) {
    console.log(rc.value.refcontract)
    if (rc.value.refcontract === 'datatype') {
      datatypeList.push(rc.value)
      console.log(datatypeList)
    } else if (rc.value.refcontract === 'units') {
      unitsList.push(rc.value)
    } else if (rc.value.refcontract === 'compute') {
      computeList.push(rc.value)
    } else if (rc.value.refcontract === 'packaging') {
      packagingList.push(rc.value)
    }
  }
  refContractHolder.datatype = datatypeList
  refContractHolder.units = unitsList
  refContractHolder.compute = computeList
  refContractHolder.packaging = packagingList
  return refContractHolder
}

export default ReferenceContractComposer
