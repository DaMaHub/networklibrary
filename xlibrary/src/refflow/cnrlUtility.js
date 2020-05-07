'use strict'
/**
*  cnrl utiltiy for contract extraction
*
*
* @class CNRLUtility
* @package    CNRLUtility
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import Xlibrarystorage from './xlibraryStorage.js'
import CNRLmaster from './cnrlMaster.js'
const util = require('util')
const events = require('events')
const axios = require('axios')

var CNRLUtility = function (setIN) {
  events.EventEmitter.call(this)
  this.liveCNRL = new CNRLmaster(setIN)
  this.liveXlibrary = new Xlibrarystorage(setIN)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(CNRLUtility, events.EventEmitter)

/**
*  default API's hardwired into toolkit setup
* @method defautNetworkContracts
*
*/
CNRLUtility.prototype.defautNetworkContracts = async function (refIN) {
  const dataCNRLbundle = {}
  let defaultCNRLsetup = await this.liveCNRLStore.defautCNRL(refIN)
  dataCNRLbundle = defaultCNRLsetup[0]
  return dataCNRLbundle
}

/**
* Network Authorisation & CONNECT
* @method connectPeerNSnetwork
*
*/
CNRLUtility.prototype.connectPeerNSnetwork = async function (authNetwork, authBundle) {
  console.log('ask connect to HS NETWORK')
  let startNXP = {}
  // connect self verified
  if (authNetwork === 'safenetwork') {
    // implement in network release see DIY repo on github.
  } else if (authNetwork === 'cloud') {
    let defaultAPI = '33221100'
    let authStatus = this.checkAuthorisation(defaultAPI, authBundle)
    const defaultRefs = await this.startPeerLibrary()
  }
  return startNXP
}

/**
* Network Authorisation & CONNECT
* @method connectNSnetwork
*
*/
CNRLUtility.prototype.connectNSnetwork = async function (authNetwork, authBundle) {
  console.log('ask connect to HS NETWORK')
  let network = 'cloud'
  let starthsNXP = {}
  // connected annon
  if (network === 'safenetwork') {
    // implement in network release see DIY repo on github.
  } else if (network === 'cloud') {
    let readOnly = { 'publickey': authNetwork, 'token': authBundle, 'cnrl': 'cnrl-33221101' }
    starthsNXP = await this.startannonCycle(readOnly)
  }
}

/**
* OK to sign in to this peers account?
* @method checkAuthorisation
*
*/
CNRLUtility.prototype.checkAuthorisation = function (defaultAPI, authBundle) {
  const auth = false
  //auth = this.liveXlibrary.networkAuthorisation(defaultAPI, authBundle)
  return auth
}

/**
* gets peers Default library settings e.g data types ref contracts etc
* @method startPeerLibrary
*
*/
CNRLUtility.prototype.startPeerLibrary = async function () {
  // loop of defaults ref contracts
  // const refTypes = ['datatypes', 'compute', 'units', 'experiment']
  // for (let rf of refTypes) {
    // let refLive = this.liveXlibrary.lookup(rf)
  // }
  return true
}

/**
* get the latest KBL state
* @method startKBL
*
*/
CNRLUtility.prototype.startKBL = async function () {
  // latest nxp and ledger entries, CNRL contract look ups
  let kbIndex = []
  let NXPlist = []
  let startLedger = await this.liveXlibrary.getNXPindex('genesis', 10)
  console.log('startledgerannon')
  console.log(startLedger)
  // loop over and filter out CNRL contract  (TODO expand based on signed and KBID address ie. crytop verification)
  for (let kb of startLedger) {
    let cnrlType = this.liveCNRL.lookupContract(kb.cnrl)
    let kBundle = {}
    kBundle.kbid = kb
    kBundle.cnrl = cnrlType
    kbIndex.push(kBundle)
  }
  // filter for NXP and Kbid entry
  for (let ki of kbIndex) {
    if (ki.cnrl.type === 'experiment') {
      NXPlist.push(ki.cnrl)
    }
  }
  return NXPlist
}

/**
* get the latest KBL state
* @method startKBL
*
*/
CNRLUtility.prototype.startPeerKBL = async function () {
  // latest nxp and ledger entries, CNRL contract look ups
  let nxpIndex = []
  let NXPlist = []
  let startLedger = await this.liveXlibrary.getNXPindex('contract', 10)
  console.log('startledger')
  console.log(startLedger)
  // exclude genesis
  for (let ki of startLedger) {
    if (ki.merkle !== 'genesis') {
      NXPlist.push(ki)
    }
  }
  // loop over and filter out CNRL contract  (TODO expand based on signed and KBID address ie. crytop verification)
  for (let nxc of NXPlist) {
    let cnrlType = this.liveCNRL.lookupContract(nxc.cnrl)
    let kBundle = {}
    kBundle.index = nxc
    kBundle.contract = cnrlType
    nxpIndex.push(kBundle)
  }
  return nxpIndex
}

/**
* look up CNRL contract
* @method contractCNRL
*
*/
CNRLUtility.prototype.contractCNRL = function (cnrl) {
  let cnrlContract = this.liveCNRL.lookupContract(cnrl)
  return cnrlContract
}

/**
* get modules per NXP cnrl
* @method modulesCNRL
*
*/
CNRLUtility.prototype.modulesCNRL = async function (mList) {
  // modules for NXP cnrl contract
  let moduleList = []
  // look up module cnrls
  for (let km of mList) {
    let cnrlModule = await this.liveXlibrary.peerModules(km)
    // let cnrlModule = this.liveCNRL.lookupContract(km)
    moduleList.push(cnrlModule)
  }
  return moduleList
}

/**
* get modules per NXP cnrl
* @method saveModule
*
*/
CNRLUtility.prototype.saveModule = async function (newVersion) {
  let cnrlSaveModule = await this.liveXlibrary.newVerionContract(newVersion)
  console.log(cnrlSaveModule)
  return true
}

/**
*  trace to source contract
* @method traceSource
*
*/
CNRLUtility.prototype.traceSource = function (dataSource) {
  console.log('datasource')
  console.log(dataSource)
  let soureInfoDTs = {}
  // are the DataTypes primary or derived?
  let sourceDTextract = this.mapSourceDTs(dataSource.datatypein)
  soureInfoDTs.datatypes = sourceDTextract
  // is the API derived?
  let sourceInfo = this.checkForSourceAPI(dataSource, sourceDTextract)
  soureInfoDTs.tidy = sourceInfo.tidy
  // do the same for categories dts
  let categoryMapDTs = this.mapCategoryDataTypes(dataSource, sourceInfo)
  soureInfoDTs.category = categoryMapDTs
  return soureInfoDTs
}

/**
*  map data type to souce DT if they exist //
* @method mapSourceDTs
*
*/
CNRLUtility.prototype.mapSourceDTs = function (lDTs) {
  let sourceDTextract = []
  for (let iDT of lDTs) {
    // look up datatype contract to see if derived?
    if (iDT.source === 'cnrl-derived') {
      // loop over source DT's
      for (let sDT of iDT.dtsource) {
        // look up datatype contract
        let dtprime = this.liveCNRL.lookupContract(sDT)
        dtprime.prime['primary'] = 'derived'
        sourceDTextract.push(dtprime.prime)
      }
    } else {
      iDT['primary'] = 'primary'
      sourceDTextract.push(iDT)
    }
  }
  // need to remove duplicate elements
  sourceDTextract = sourceDTextract.filter((dtSource, index, self) =>
    index === self.findIndex((t) => (
        t.cnrl === dtSource.cnrl
    ))
  )
  return sourceDTextract
}

/**
*  check if API data has source ie primary origin? Extract tidy info.
* @method checkForSourceAPI
*
*/
CNRLUtility.prototype.checkForSourceAPI = function (dataSource, sourceDTextract) {
  console.log('check for source API')
  let sourceAPI = {}
  if (dataSource.source !== 'cnrl-primary') {
    // look up source data packaging
    sourceAPI.source = this.liveCNRL.lookupContract(dataSource.source)
    sourceAPI.tidy = this.tidyDataReported(sourceAPI.source, sourceDTextract)
  } else {
    // extract tidy logic info.
    sourceAPI.tidy = dataSource.tidyList
  }
  return sourceAPI
}

/**
*  does data need tidying?
* @method tidyDataReported
*
*/
CNRLUtility.prototype.tidyDataReported = function (dataSource, sourceDTextract) {
  // tidy data info available?
  let TidyDataLogic = {}
  if (dataSource.tidy === true) {
    // investiage the source contract
    // does the live DT require any tidying?
    for (let tldt of SpackagingDTs.tidyList) {
      for (let dtl of sourceDTextract) {
        if (dtl.cnrl === tldt.cnrl) {
          TidyDataLogic = SpackagingDTs.tidyList
        } else {
          // TidyDataLogic = []
        }
      }
    }
  }
  return TidyDataLogic
}

/**
*  // map category datatypes //
* @method mapCategoryDataTypes
*
*/
CNRLUtility.prototype.mapCategoryDataTypes = function (source, SpackagingDTs) {
  // if null check if category dt, ie derived from two or more dataTypeSensor
  // let catDTmapAPI = []
  let checkDTcategory = []
  let extractCatDT = []
  if (source.category.length > 0 && source.category.cnrl !== 'none') {
    checkDTcategory = this.categoryCheck(source.category, SpackagingDTs)
    // now check the API query for this dataType
    // todo extract data type ie loop over category matches, same or all different?
    // lookup the dataType
    let catDT = []
    extractCatDT = this.liveCNRL.lookupContract(source.category.column)
    catDT.push(extractCatDT.prime)
    // catDTmapAPI = this.datatypeCheckAPI(packagingDTs, catDT)
  } else {
    checkDTcategory = []
  }
  return checkDTcategory
}

/**
*  // map data prime to source data types //
* @method categoryCheck
*
*/
CNRLUtility.prototype.categoryCheck = function (cdt, catSource) {
  let catMatch = []
  for (let catS of catSource.categorycodes) {
    for (let sc of catS.categories) {
      let scat = sc.cnrl
      let uicat = cdt.cnrl
      // any matches to data type in
      if (scat === uicat) {
        let codeLogic = sc.code
        let catHolderLogic = {}
        catHolderLogic.column = catS.column
        catHolderLogic.code = codeLogic
        catMatch.push(catHolderLogic)
      }
    }
  }
  return catMatch
}

export default CNRLUtility
