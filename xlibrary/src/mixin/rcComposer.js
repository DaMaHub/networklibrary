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
import DatatypeRefCont from './referencecontracts/datatypeRef.js'
import PackagingRefCont from './referencecontracts/packagingRef.js'
import ComputeRefCont from './referencecontracts/computeRef.js'
import VisualiseRefCont from './referencecontracts/visualiseRef.js'
const util = require('util')
const events = require('events')

var ReferenceContractComposer = function () {
  events.EventEmitter.call(this)
  console.log('ref contract composer live')
  this.cryptoLive = new CryptoUtility()
  this.datatypeRefLive = new DatatypeRefCont()
  this.packagingRefLive = new PackagingRefCont()
  this.computeRefLive = new ComputeRefCont()
  this.visualiseRefLive = new VisualiseRefCont()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ReferenceContractComposer, events.EventEmitter)

/**
* Datatype composer
* @method datatypeComposer
*
*/
ReferenceContractComposer.prototype.datatypeComposer = function (input) {
  console.log('prepare New datatype contract')
  const preContract = this.datatypeRefLive.dataTypePrepare(input)
  return preContract
}

/**
* Packaging composer
* @method packagingComposer
*
*/
ReferenceContractComposer.prototype.packagingComposer = function (input) {
  console.log('prepare New Packaing contract')
  const preContract = this.packagingRefLive.packagingPrepare(input)
  return preContract
}

/**
* Compute composer
* @method computeComposer
*
*/
ReferenceContractComposer.prototype.computeComposer = function (input) {
  console.log('prepare New compute contract')
  const preContract = this.computeRefLive.computePrepare(input)
  return preContract
}

/**
* Visualise composer
* @method visualiseComposer
*
*/
ReferenceContractComposer.prototype.visualiseComposer = function (input) {
  console.log('prepare New visualise contract')
  const preContract = this.visualiseRefLive.visualisePrepare(input)
  return preContract
}

/**
* match contract id to ref contract
* @method refcontractLookup
*
*/
ReferenceContractComposer.prototype.refcontractLookup = function (cnrl, allContracts) {
  console.log('all ref contracts')
  console.log(cnrl)
  console.log(allContracts)
  let matchKey = {}
  for (const rc of allContracts) {
    console.log(rc)
    if (cnrl.trim() === rc.key) {
      matchKey = rc
    }
  }
  return matchKey
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
  const moduleList = []
  const visualiseList = []
  const nxpList = []
  for (const rc of refContractsList) {
    // console.log(rc)
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
    } else if (rc.value.refcontract === 'module') {
      const refCont = { key: rc.key, value: rc.value }
      moduleList.push(refCont)
    } else if (rc.value.refcontract === 'visualise') {
      const refCont = { key: rc.key, value: rc.value }
      visualiseList.push(refCont)
    } else if (rc.value.refcontract === 'experiment') {
      const refCont = { key: rc.key, value: rc.value }
      nxpList.push(refCont)
    }
  }
  refContractHolder.datatype = datatypeList
  refContractHolder.units = unitsList
  refContractHolder.compute = computeList
  refContractHolder.packaging = packagingList
  refContractHolder.module = moduleList
  refContractHolder.visualise = visualiseList
  refContractHolder.experiment = nxpList
  return refContractHolder
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
  let countCol = 1
  for (const co of col) {
    console.log(co)
    for (const tb of table) {
      console.log(tb[0])
      if (co.count === countCol) {
        const mapPair = {}
        mapPair.refcontract = tb[0].key
        mapPair.column = co.name
        mapped.push(mapPair)
        countCol++
      }
    }
  }
  console.log('mapped pair')
  console.log(mapped)
  return mapped
}

export default ReferenceContractComposer
