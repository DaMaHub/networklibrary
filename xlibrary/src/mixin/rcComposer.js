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
  // need to prepare matching of datatyps ref contracts to table columns
  const mergeDTColumn = this.mergePackageMap(inputRC.apicolumns, inputRC.apicolHolder)
  const newPackagingMap = {}
  newPackagingMap.name = inputRC.name
  newPackagingMap.description = inputRC.description
  newPackagingMap.primary = inputRC.primary
  newPackagingMap.api = inputRC.api
  newPackagingMap.apibase = inputRC.apibase
  newPackagingMap.apipath = inputRC.apipath
  newPackagingMap.tablestructure = mergeDTColumn
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = newPackagingMap
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
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
* map columns to datatype reference contracts
* @method mergePackageMap
*
*/
ReferenceContractComposer.prototype.mergePackageMap = function (col, table) {
  console.log('map columns to dts contracts')
  console.log(col)
  console.log(table)
  const mapped = []
  // remove first element array empty by design
  table.shift()
  for (const co of col) {
    console.log(co)
    for (const tb of table) {
      console.log(tb[0])
      const mapPair = {}
      mapPair.refcontract = tb[0].key
      mapPair.column = co.name
      mapped.push(mapPair)
    }
  }
  console.log('mapped pair')
  console.log(mapped)
  return mapped
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
    console.log(rc)
    if (rc.value.refcontract === 'datatype') {
      const refCont = { key: rc.key, value: rc.value }
      datatypeList.push(refCont)
    } else if (rc.value.refcontract === 'units') {
      const refCont = { key: rc.key, value: rc.value }
      unitsList.push(refCont)
    } else if (rc.value.refcontract === 'compute') {
      const refCont = { key: rc.key, value: rc.value }
      computeList.push(refCont)
    } else if (rc.value.refcontract === 'packaging') {
      const refCont = { key: rc.key, value: rc.value }
      packagingList.push(refCont)
    }
  }
  refContractHolder.datatype = datatypeList
  refContractHolder.units = unitsList
  refContractHolder.compute = computeList
  refContractHolder.packaging = packagingList
  return refContractHolder
}

export default ReferenceContractComposer
