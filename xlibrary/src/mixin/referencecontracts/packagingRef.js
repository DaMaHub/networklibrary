'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class PackagingReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
const util = require('util')
const events = require('events')

var PackagingReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(PackagingReferenceContract, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method packagingPrepare
*
*/
PackagingReferenceContract.prototype.packagingPrepare = function (inputRC) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'packaging'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  const mergeDTColumn = this.mergePackageMap(inputRC.apicolumns, inputRC.apicolHolder)
  console.log('merge colums back')
  console.log(mergeDTColumn)
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
  console.log('package holder')
  console.log(RefContractHolder)
  return RefContractHolder
}

/**
* map columns to datatype reference contracts
* @method mergePackageMap
*
*/
PackagingReferenceContract.prototype.mergePackageMap = function (col, table) {
  const mapped = []
  // remove first element array empty by design
  table.shift()
  console.log('map columns to dts contracts')
  console.log(table)
  console.log(col)
  let countCol = 0
  for (const co of col) {
    countCol++
    if (co.count === countCol) {
      const keyID = countCol - 1
      console.log('keuy' + keyID)
      console.log('counts match')
      console.log(table)
      console.log(table[keyID])
      const mapPair = {}
      mapPair.refcontract = table[keyID][0].key
      mapPair.column = co.name
      mapped.push(mapPair)
    }
    /* for (const tb of table) {
      console.log(co.count)
      console.log(countCol)
      if (co.count === countCol) {
        // const keyID = countCol
        console.log('counts match')
        console.log(tb)
        const mapPair = {}
        mapPair.refcontract = tb[0].key
        mapPair.column = co.name
        mapped.push(mapPair)
      } */
    // }
  }
  console.log('mapped pair')
  console.log(mapped)
  return mapped
}

export default PackagingReferenceContract
