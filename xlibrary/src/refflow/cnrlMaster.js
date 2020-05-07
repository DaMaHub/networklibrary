'use strict'
/**
*  Computational Network Reference layer
*
*
* @class CNRLmaster
* @package    testStorage API
* @copyright  Copyright (c) 2019 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var CNRLmaster = function (apiSettings) {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(CNRLmaster, events.EventEmitter)

/**
* Index of datatypes
* @method indexDatatypes
*
*/
CNRLmaster.prototype.indexDatatypes = function () {
  // index datatype live in network by cnrl // id
  let indexDTlive = ['cnrl-8856388711', 'cnrl-8856388712', 'cnrl-8856388713', 'cnrl-8856388723', 'cnrl-8856388727', 'cnrl-8356388727', 'cnrl-8326388727', 'cnrl-8326328727', 'cnrl-3356388722', 'cnrl-3356388733', 'cnrl-8856388724', 'cnrl-8856388322', 'cnrl-8856388924', 'cnrl-8856389322', 'cnrl-8856388725']
  return indexDTlive
}

/**
* Index of science computations
* @method indexCompute
*
*/
CNRLmaster.prototype.indexCompute = function () {
  // index datatype live in network by cnrl // id
  let indexComputelive = ['cnrl-2356388731', 'cnrl-2356388737', 'cnrl-2356388732', 'cnrl-2356383848']
  return indexComputelive
}

/**
* Index of experiments
* @method indexExperiments
*
*/
CNRLmaster.prototype.indexExperiments = function () {
  // index datatype live in network by cnrl // id
  let indexExperimentslive = []
  indexExperimentslive.push('cnrl-848388553323', 'cnrl-888388992224', 'cnrl-888388443324', 'cnrl-888355992223', 'cnrl-88735d99d228', 'cnrl-888388233324', 'cnrl-888388232224', 'cnrl-848388554344', 'cnrl-848388553329', 'cnrl-888355992224')
  return indexExperimentslive
}

/**
* Sensor to Datatype Mapping as per CNRL contracts
* @method sensorMappingDatatype
*
*/
CNRLmaster.prototype.sensorMappingDatatype = function (sensorTypes) {
  // get detail on spec for data source
  let dataFilter = []
  for (let sen of sensorTypes) {
    if (sen.device_sensorid === 'lightLED') {
      dataFilter.push({'text': 'bpm', 'active': 'true'})
    } else if (sen.device_sensorid === 'accelerometer') {
      dataFilter.push({'text': 'steps', 'active': 'true'})
    }
  }
  return dataFilter
}

/**
*  get contract info.
* @method lookupContract
*
*/
CNRLmaster.prototype.lookupContract = function (refIN) {
  let dataCNRLbundle = {}
  dataCNRLbundle.type = ''
  dataCNRLbundle.livingpaper = ''
  dataCNRLbundle.prime = {}
  dataCNRLbundle.history = {}
  dataCNRLbundle.resolution = {}
  dataCNRLbundle.source = []
  dataCNRLbundle.input = []
  dataCNRLbundle.tidy = false
  dataCNRLbundle.tidyList = []
  dataCNRLbundle.apistructure = []
  dataCNRLbundle.tableStructure = []
  dataCNRLbundle.categorycodes = []
  dataCNRLbundle.dtsource = []
  dataCNRLbundle.categories = []
  dataCNRLbundle.wasmhash = ''
  dataCNRLbundle.wasmfile = ''
  dataCNRLbundle.apisave = ''
  dataCNRLbundle.namespace = ''
  dataCNRLbundle.index = []
  dataCNRLbundle.kentities = []
  dataCNRLbundle.modules = []
  dataCNRLbundle.grid = []
  dataCNRLbundle.dtcompute = []
  dataCNRLbundle.category = []
  dataCNRLbundle.compute = ''
  dataCNRLbundle.controlpanel = []
  dataCNRLbundle.automation = false
  if (refIN === 'cnrl-8856388711') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.history = {'proposed': 157118400, 'accepted': 15728400, 'votes': 343}
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388711', 'text': 'bpm', 'active': false }
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-8856388711'
  } else if (refIN === 'cnrl-8856388712') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388712', 'text': 'steps', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'metres', 'active': false }
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-8856388712'
    dataCNRLbundle.index = ['']
  } else if (refIN === 'cnrl-8856388713') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '60 seconds', 'active': false }
    dataCNRLbundle.namespace = 'cnrl-8856388713'
    dataCNRLbundle.index = ['']
  } else if (refIN === 'cnrl-8856388723') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388723', 'text': 'average', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856388727') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388727', 'text': 'recovery', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.cate = []
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8356388727') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8356388727', 'text': 'sleep', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-3356388722']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8326388727') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8326388727', 'text': 'walking', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-', 'cnrl-']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8326328727') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8326328727', 'text': 'running', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-', 'cnrl-']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3356388722') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3356388722', 'text': 'raw_kind', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = []
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3356388733') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3356388733', 'text': 'RAW_INTENSITY', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = []
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': '', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856388724') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388724', 'text': 'average-heartrate', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-8856388711']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856388322') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388322', 'text': 'average-steps', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-8856388712']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856388924') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388924', 'text': 'sum-heartrate', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-8856388711']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856389322') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856389322', 'text': 'sum-steps', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-8856388712']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856388725') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388725', 'text': 'recovery-heartrate', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = ['cnrl-8856388711', 'cnrl-8856388725']
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-8856388748') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-8856388748', 'text': 'p-value', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.dtsource = []
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'statistics', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3993714611') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3993714611', 'text': 'p10', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'parts per million', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3339949442') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3339949442', 'text': 'SDS_P2', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'parts per million', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3339949443') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3339949443', 'text': 'SDS_P1', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'parts per million', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3339949444') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3339949444', 'text': 'temperature', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'celsius', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3339949445') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3339949445', 'text': 'humidity', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'moisture per ', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-3339949446') {
    dataCNRLbundle.type = 'datatype'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-3339949446', 'text': 'airpressure', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes.push({})
    dataCNRLbundle.resolution = { 'text': 'atmosphere pressing on earth', 'active': false }
    dataCNRLbundle.namespace = ''
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-2356388731') {
    dataCNRLbundle.type = 'compute'
    dataCNRLbundle.livingpaper = 'http://www.healthscience.network/observation'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-2356388731', 'text': 'Observations', 'active': false }
    dataCNRLbundle.wasmhash = 'none'
    dataCNRLbundle.wasmfile = 'none'
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-2356388731'
  } else if (refIN === 'cnrl-2356388737') {
    dataCNRLbundle.type = 'compute'
    dataCNRLbundle.livingpaper = 'http://www.healthscience.network/sum'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-2356388737', 'text': 'Sum per time', 'active': false }
    dataCNRLbundle.wasmhash = '2356388737'
    dataCNRLbundle.wasmfile = 'safe://wasm/cnrl-2356388737'
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-2356388737'
  } else if (refIN === 'cnrl-2356388732') {
    dataCNRLbundle.type = 'compute'
    dataCNRLbundle.livingpaper = 'http://www.healthscience.network/average'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-2356388732', 'text': 'average', 'active': false }
    dataCNRLbundle.wasmhash = '2356388732'
    dataCNRLbundle.wasmfile = 'safe://wasm/cnrl-2356388732'
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-2356388732'
  } else if (refIN === 'cnrl-2356383848') {
    dataCNRLbundle.type = 'compute'
    dataCNRLbundle.livingpaper = ''
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-2356383848', 'text': 'correlation', 'active': false }
    dataCNRLbundle.wasmhash = '2356388733'
    dataCNRLbundle.wasmfile = 'safe://wasm/cnrl-2356383848'
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-2356383848'
  } else if (refIN === 'cnrl-2356388733') {
    dataCNRLbundle.type = 'compute'
    dataCNRLbundle.livingpaper = 'https://docs.google.com/document/d/11JWcbBrwgLIqPc7V7GpI_WbACuIS_4h630zdT66Re3s/edit'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-2356388733', 'text': 'recovery-heartrate', 'active': false }
    dataCNRLbundle.wasmhash = '2356388733'
    dataCNRLbundle.wasmfile = 'safe://wasm/cnrl-2356388733'
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-2356388733'
  } else if (refIN === '33221101' || refIN === 'cnrl-33221101') {
    // CNRL implementation REST API
    dataCNRLbundle.type = 'dtpackaging'
    dataCNRLbundle.source = 'cnrl-773355992211'
    dataCNRLbundle.prime = { 'cnrl': '33221101', 'text': 'mongo-RESTAPI', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.device = '/contextdata/'
    dataCNRLbundle.devicetableStructure = [{'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'cnrl-', 'text': 'compref', 'active': false}, {'cnrl': 'cnrl-', 'text': 'datatype', 'active': false}, {'cnrl': 'cnrl-', 'text': 'timeseg', 'active': false}, {'cnrl': 'cnrl-', 'text': 'value', 'active': false}, {'cnrl': 'cnrl-', 'text': 'device_mac', 'active': false}, {'cnrl': 'cnrl-', 'text': 'clean', 'active': false}, {'cnrl': 'cnrl-', 'text': 'tidy', 'active': false}]
    dataCNRLbundle.apistructure = ['computedata/<publickey>/<token>/<queryTime>/<deviceID>/', 'contexttype/<publickey>/', 'average/<publickey>/<token>/<queryTime>/<deviceID>/', 'sum/<publickey>/<token>/<queryTime>/<deviceID>/']
    dataCNRLbundle.tableStructure[0] = [{'cnrl': '', 'text': '_id', 'active': false}, {'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': '', 'text': 'device_mac', 'active': false}, {'cnrl': 'cnrl-', 'text': 'device_id', 'active': false}, {'cnrl': 'cnrl-', 'text': 'user_id', 'active': false}, {'cnrl': 'cnrl-3356388733', 'text': 'raw_intensity', 'active': false}, {'cnrl': 'cnrl-8856388712', 'text': 'steps', 'active': false}, {'cnrl': 'cnrl-3356388722', 'text': 'raw_kind', 'active': false}, {'cnrl': 'cnrl-8856388711', 'text': 'heart_rate', 'active': false}, {'cnrl': 'cnrl-', 'text': 'publickey', 'active': false}, {'cnrl': '', 'text': 'compref', 'active': false}]
    dataCNRLbundle.tableStructure[1] = [{'cnrl': '', 'text': 'device_mac', 'active': false}, {'cnrl': '', 'text': 'firmware', 'active': false}]
    dataCNRLbundle.tableStructure[2] = [{'cnrl': 'cnrl-8856388724', 'text': 'average-bpm', 'active': false}, {'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'cnrl-8856388322', 'text': 'average-steps', 'active': false}]
    dataCNRLbundle.tableStructure[3] = [{'cnrl': 'cnrl-8856388924', 'text': 'sum-bpm', 'active': false}, {'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'cnrl-8856389322', 'text': 'sum-steps', 'active': false}]
    dataCNRLbundle.apisave = 'results/<publickey>/<token>/<data>'
    dataCNRLbundle.namespace = 'http://165.227.244.213:8882'
    dataCNRLbundle.index = []
  } else if (refIN === '33221102' || refIN === 'cnrl-33221102') {
    // CNRL implementation REST API
    dataCNRLbundle.type = 'dtpackaging'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': '33221102', 'text': 'mongo-RESTAPI', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.device = '/luftdatendevice/'
    dataCNRLbundle.devicetableStructure = [{'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'cnrl-', 'text': 'compref', 'active': false}, {'cnrl': 'cnrl-', 'text': 'datatype', 'active': false}, {'cnrl': 'cnrl-', 'text': 'timeseg', 'active': false}, {'cnrl': 'cnrl-', 'text': 'value', 'active': false}, {'cnrl': 'cnrl-', 'text': 'device_mac', 'active': false}, {'cnrl': 'cnrl-', 'text': 'clean', 'active': false}, {'cnrl': 'cnrl-', 'text': 'tidy', 'active': false}]
    dataCNRLbundle.apistructure = ['luftdatenGet/<publickey>/<token>/<queryTime>/<deviceID>/']
    let subColumn = [{'cnrl': 'cnrl-3339949442', 'text': 'SDS_P2', 'active': false}, {'cnrl': 'cnrl-3339949443', 'text': 'SDS_P1', 'active': false}, {'cnrl': 'cnrl-3339949444', 'text': 'temperature', 'active': false}, {'cnrl': 'cnrl-3339949445', 'text': 'humidity', 'active': false}, {'cnrl': 'cnrl-3339949446', 'text': 'airpressure', 'active': false}]
    dataCNRLbundle.tableStructure[0] = [{'cnrl': 'cnrl-', 'text': 'publickey', 'active': false}, {'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'datasub', 'text': 'sensordata', 'active': false, 'data': subColumn}]
    dataCNRLbundle.namespace = 'http://165.227.244.213:8881'
    dataCNRLbundle.index = []
  } else if (refIN === '33221112' || refIN === 'cnrl-33221112') {
    // CNRL implementation REST API
    dataCNRLbundle.type = 'dtpackaging'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': '33221112', 'text': 'mongo-RESTAPI', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.device = 'luftdatendevice/<publickey>/'
    dataCNRLbundle.devicetableStructure = [{'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'cnrl-', 'text': 'compref', 'active': false}, {'cnrl': 'cnrl-', 'text': 'datatype', 'active': false}, {'cnrl': 'cnrl-', 'text': 'timeseg', 'active': false}, {'cnrl': 'cnrl-', 'text': 'value', 'active': false}, {'cnrl': 'cnrl-', 'text': 'device_mac', 'active': false}, {'cnrl': 'cnrl-', 'text': 'clean', 'active': false}, {'cnrl': 'cnrl-', 'text': 'tidy', 'active': false}]
    dataCNRLbundle.apistructure = ['luftdatenGet/<publickey>/<token>/<queryTime>/<deviceID>/']
    let subColumn = [{'cnrl': 'cnrl-3339949442', 'text': 'SDS_P2', 'active': false}, {'cnrl': 'cnrl-3339949443', 'text': 'SDS_P1', 'active': false}, {'cnrl': 'cnrl-3339949444', 'text': 'BME280_temperature', 'active': false}, {'cnrl': 'cnrl-3339949445', 'text': 'BME280_humidity', 'active': false}, {'cnrl': 'cnrl-3339949446', 'text': 'BME280_pressure', 'active': false}]
    dataCNRLbundle.tableStructure[0] = [{'cnrl': 'cnrl-', 'text': 'publickey', 'active': false}, {'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'datasub', 'text': 'sensordata', 'active': false, 'data': subColumn}]
    dataCNRLbundle.namespace = 'http://165.227.244.213:8881/'
    dataCNRLbundle.index = []
  } else if (refIN === '33221103') {
    // CNRL implementation REST API
    dataCNRLbundle.type = 'dtpackaging'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': '33221103', 'text': 'luftaten-archive-RESTAPI', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.device = ''
    dataCNRLbundle.devicetableStructure = []
    dataCNRLbundle.apistructure = ['<date>/<fileS1>', '<date>/<fileS2>']
    dataCNRLbundle.tableStructure[0] = [{'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}, {'cnrl': 'cnrl-3339949442', 'text': 'SDS_P2', 'active': false}, {'cnrl': 'cnrl-3339949443', 'text': 'SDS_P1', 'active': false}, {'cnrl': 'cnrl-3339949444', 'text': 'temperature', 'active': false}, {'cnrl': 'cnrl-3339949445', 'text': 'humidity', 'active': false}, {'cnrl': 'cnrl-3339949446', 'text': 'airpressure', 'active': false}]
    dataCNRLbundle.tableStructure[1] = [{'cnrl': 'cnrl-8856388713', 'text': 'timestamp', 'active': false}]
    dataCNRLbundle.namespace = 'http://archive.luftdaten.info/'
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-773355992211') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'dtpackaging'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-773355992211', 'text': 'Gadgetbridge-SQLite', 'active': false }
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = [{'cnrl': 'cnrl-8856388711', 'codes': [-1, 0, 255]}]
    dataCNRLbundle.device = ''
    dataCNRLbundle.devicetableStructure = []
    dataCNRLbundle.tableStructure = [{'cnrl': 'cnrl-8856388713', 'text': 'TIMESTAMP', 'active': false}, {'cnrl': 'cnrl', 'text': 'DEVICE_ID', 'active': false}, {'cnrl': 'cnrl', 'text': 'USER_ID', 'active': false}, {'cnrl': 'cnrl-3356388733', 'text': 'RAW_INTENSITY', 'active': false}, {'cnrl': 'cnrl-8856388712', 'text': 'STEPS', 'active': false}, {'cnrl': 'cnrl-3356388722', 'text': 'RAW_KIND', 'active': false}, {'cnrl': 'cnrl-8856388711', 'text': 'HEART_RATE', 'active': false}]
    dataCNRLbundle.categorycodes.push({'column': 'cnrl-3356388722', 'categories': [{'code': '112', 'cnrl': 'cnrl-8356388727', 'active': false}, {'code': '202', 'cnrl': 'cnrl-8356388727', 'active': false}]})
    dataCNRLbundle.categorycodes.push({'column': 'cnrl-3356388733', 'categories': [{'code': '312', 'cnrl': 'cnrl-8326388727', 'active': false}, {'code': '302', 'cnrl': 'cnrl-8326328727', 'active': false}]})
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-773355992211'
    dataCNRLbundle.index = []
  } else if (refIN === 'cnrl-888355992223') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-888355992223', 'text': 'SLEEP - When do I sleep the best?', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-888355992223'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['cnrl-2356388731']
    dataCNRLbundle.modules = []
  } else if (refIN === 'cnrl-88735d99d228') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-88735d99d228', 'text': 'STRESS - Mental Health', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-88735d99d228'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['cnrl-88735d99d228']
  } else if (refIN === 'cnrl-888355992224') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-888355992224', 'text': 'CALE I am an evolutionary algorithm learning all the time', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-888355992223'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['cnrl-2356388731']
  } else if (refIN === 'cnrl-888388992224') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-888388992224', 'text': 'EXERCISE - Resting HR Recovery', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/d/11JWcbBrwgLIqPc7V7GpI_WbACuIS_4h630zdT66Re3s/edit'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-888388992224'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['cnrl-2356388731']
  } else if (refIN === 'cnrl-888388232224') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-888388232224', 'text': 'EATING - Intermitting fasting', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-888388992224'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['cnrl-2356388731']
  } else if (refIN === 'cnrl-888388233324') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-888388233324', 'text': 'ENVIRONMENT - Air quality and weather', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-888388233324'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = []
  } else if (refIN === 'cnrl-888388443324') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-888388443324', 'text': 'EXERCISE - Stemcell patch recovery', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-888388233324'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['cnrl-2356388731']
  } else if (refIN === 'cnrl-848388553323') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-848388553323', 'text': 'EXERCISE - Daily step planning', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-848388553323'
    dataCNRLbundle.index = []
    dataCNRLbundle.modules = ['cnrl-001234543212', 'cnrl-001234543303', 'cnrl-001234543304', 'cnrl-001234543213', 'cnrl-001234543214', 'cnrl-001234543215', 'cnrl-001234543458', 'cnrl-001234543216', 'cnrl-001234543217', 'cnrl-001234543218', 'cnrl-001234543219']
    dataCNRLbundle.kentities = ['PxaTn6JAP8fUowppmNvLniqmFYV9VQMDVVcP5n7BqTm']
  } else if (refIN === 'cnrl-848388553329') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-848388553329', 'text': 'REJUVENATION - Mitochondrial therapy', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/cnrl-848388553329'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['']
  } else if (refIN === 'cnrl-848388554344') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'experiment'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-848388554344', 'text': 'EATING, Food, Nutrition', 'active': false }
    dataCNRLbundle.livingpaper = {'link': 'https://docs.google.com/document/'}
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.categorycodes.push()
    dataCNRLbundle.resolution = {}
    dataCNRLbundle.namespace = 'safe://cnrl/848388554344'
    dataCNRLbundle.index = []
    dataCNRLbundle.kentities = ['']
  } else if (refIN === 'cnrl-001234543212') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543212', 'text': 'Question', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543212'
    dataCNRLbundle.grid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: true }]
  } else if (refIN === 'cnrl-001234543303') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543303', 'text': 'Device', 'active': false }
    dataCNRLbundle.device = { 'cnrl': 'cnrl-33221101'}
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543303'
    dataCNRLbundle.grid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
  } else if (refIN === 'cnrl-001234543304') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543304', 'text': 'Dapp', 'active': false }
    dataCNRLbundle.device = { 'cnrl': 'cnrl-dappdapp'}
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543304'
    dataCNRLbundle.grid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
  } else if (refIN === 'cnrl-001234543213') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543213', 'text': 'Education', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543213'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-001234543214') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543214', 'text': 'Compute', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543214'
    dataCNRLbundle.grid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }]
    dataCNRLbundle.dtcompute = ['cnrl-8856388711', 'cnrl-8856388712']
    dataCNRLbundle.dtresult = ['cnrl-8856388711', 'cnrl-8856388712']
    dataCNRLbundle.category = ["none"]
    dataCNRLbundle.compute = 'cnrl-2356388731'
    dataCNRLbundle.controlpanel = ['startstop']
    dataCNRLbundle.automation = true
    dataCNRLbundle.time = {"realtime" : 0, "timeseg": [ "cnrl-t1" ], "startperiod": ""}
  } else if (refIN === 'cnrl-001234543458') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543458', 'text': 'Visualise', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543458'
    dataCNRLbundle.grid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': '1', static: false }]
    dataCNRLbundle.visualise = 'cnrl-813033773883'
  } else if (refIN === 'cnrl-001234543215') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543215', 'text': 'ScienceReview', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543215'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-001234543216') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543216', 'text': 'Control', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543216'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-001234543217') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543217', 'text': 'ErrorMgt', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543217'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-001234543218') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543218', 'text': 'LifestyleMedicine', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543218'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-001234543219') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543219', 'text': 'Prescription', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543219'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-001234543220') {
    // CNRL implementation contract e.g. from mobile phone sqlite table structure
    dataCNRLbundle.type = 'module'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-001234543220', 'text': 'Communicate', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-001234543220'
    dataCNRLbundle.grid = []
  } else if (refIN === 'cnrl-813033773883') {
    dataCNRLbundle.type = 'visualise'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-813033773883', 'text': 'Chart.js', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-chart'
    dataCNRLbundle.rules = { 'xaxis': 'cnrl-8856388713', 'yaxis': 'cnrl-8856388711' } // cnrl-8856388712
    dataCNRLbundle.structure = { 'chartPackage': { 'labels': [], 'datasets': [{ label: '', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [] }] },  'chartOptions': { }, 'message': 'compute-complete' }
  } else if (refIN === 'cnrl-table') {
    dataCNRLbundle.type = 'visualise'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-table', 'text': 'vue-grid', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-table'
  } else if (refIN === 'cnrl-simulation') {
    dataCNRLbundle.type = 'visualise'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-simulation', 'text': 'simulation', 'active': false }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-simulation'
  } else if (refIN === 'cnrl-t0') {
    dataCNRLbundle.type = 'time'
    dataCNRLbundle.source = 'cnrl-primary'
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-t0', 'text': 'second', 'active': false, 'unit': 1 }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-t0'
  } else if (refIN === 'cnrl-t1') {
    dataCNRLbundle.type = 'time'
    dataCNRLbundle.source = 'cnrl-derived'
    dataCNRLbundle.dtsource = ['cnrl-t0']
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-t1', 'text': 'day', 'active': false, 'unit': 86400000 }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-t1'
  } else if (refIN === 'cnrl-t2') {
    dataCNRLbundle.type = 'time'
    dataCNRLbundle.source = 'cnrl-derive'
    dataCNRLbundle.dtsource = ['cnrl-t1']
    dataCNRLbundle.prime = { 'cnrl': 'cnrl-t2', 'text': 'week', 'active': false, 'unit': 604800000 }
    dataCNRLbundle.livingpaper = {'link': ''}
    dataCNRLbundle.namespace = 'safe://cnrl-t2'
  }
  return dataCNRLbundle
}

/**
*  mock up of mobile sqlite table structure CNRL info
* @method mobileSource
*
*/
CNRLmaster.prototype.subSource = function (refIN) {
  console.log('CRNL----lookup for upstream structure')
  // if contract has links, follow those to source TODO
  let dataCNRLbundle = {}
  dataCNRLbundle.prime = []
  dataCNRLbundle.resolution = []
  dataCNRLbundle.source = []
  dataCNRLbundle.input = []
  dataCNRLbundle.tidy = false
  dataCNRLbundle.tidyList = []
  dataCNRLbundle.tableStructure = []
  dataCNRLbundle.mobilesource = ''
  dataCNRLbundle.categories = []
  dataCNRLbundle.categorycodes = []
  let dataTypePrimary = []
  if (refIN === 'cnrl-8856388711' || refIN === '8856388711') {
    // return dataType mapping arrays
    dataTypePrimary.push({'bpm': ''})
    dataTypePrimary.push({'steps': ''})
    dataCNRLbundle.tidy = true
    dataCNRLbundle.tidyList = [-1, 0, 255]
    dataCNRLbundle.tableStructure = ['id', 'timestamp', 'bmp', 'etc']
    dataCNRLbundle.mobilesource = 'cnrl-primary'
    dataCNRLbundle.categories.push({'cnrl': 'cnrl-8356388727', 'text': 'Sleep', 'active': false})
    dataCNRLbundle.categorycodes.push({'column': 'raw_kind', 'coding': [{'212': 'lightsleep', '202': 'deepsleep'}]})
    dataCNRLbundle.categorycodes.push({'column': 'raw_intensity', 'coding': [{'312': 'walking', '302': 'running'}]})
    dataCNRLbundle.prime.push({ 'text': 'bpm', 'active': 'true' })
    dataCNRLbundle.resolution.push({ 'text': '60 seconds', 'active': 'true' })
    dataCNRLbundle.prime.push({ 'text': 'steps', 'active': 'true' })
    dataCNRLbundle.source.push(dataTypePrimary)
    dataCNRLbundle.input.push(dataTypePrimary)
  }
  return dataCNRLbundle
}

/**
*  mock up of semantic / ontology describing knowledge
* @method livingKnowledge
*
*/
CNRLmaster.prototype.livingKnowledge = function (refIN) {
  // if contract has links, follow those to source TODO
  let dataCNRLbundle = {}
  if (refIN === 'cnrl-k1') {
    dataCNRLbundle.prime = {'word': ['heart', 'movement activity steps']}
    dataCNRLbundle.science = {'science': 'mathematics'}
    dataCNRLbundle.resolution = []
    dataCNRLbundle.source = []
    dataCNRLbundle.input = []
    dataCNRLbundle.tidy = false
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.mobilesource = ''
    dataCNRLbundle.categorycodes = []
    dataCNRLbundle.index = []
    dataCNRLbundle.categories = []
  } else if (refIN === 'cnrl-k2') {
    dataCNRLbundle.prime = {'word': ['Pollution', 'Particle size']}
    dataCNRLbundle.science = {'science': 'mathematics'}
    dataCNRLbundle.resolution = []
    dataCNRLbundle.source = []
    dataCNRLbundle.input = []
    dataCNRLbundle.tidy = false
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes = []
  } else if (refIN === 'cnrl-k3') {
    dataCNRLbundle.prime = {'word': 'spacial map'}
    dataCNRLbundle.science = ['science', 'mathematics', 'statistics', 'mean', 'mode', 'median']
    dataCNRLbundle.resolution = []
    dataCNRLbundle.source = []
    dataCNRLbundle.input = []
    dataCNRLbundle.tidy = false
    dataCNRLbundle.tidyList = []
    dataCNRLbundle.tableStructure = []
    dataCNRLbundle.categories.push()
    dataCNRLbundle.categorycodes = []
  }
  return dataCNRLbundle
}

/**
*  get time datatypes for UI
* @method timeContracts
*
*/
CNRLmaster.prototype.timeContracts = function (refIN) {
  console.log('CRNL----TIMElook')
  console.log(refIN)
  let timeIndex = []
  if (refIN === 'time-index') {
    timeIndex =
    [{
      text: 'day',
      id: 'cnrl-t1',
      active: false
    },
    {
      text: 'week',
      id: 'cnrl-t2',
      active: false
    },
    {
      text: 'month',
      id: 'cnrl-t3',
      active: false
    },
    {
      text: 'year',
      id: 'cnrl-t4',
      active: false
    },
    {
      text: 'SELECT',
      id: 'cnrl-t5',
      active: false
    }]
  } else if (refIN === 'datatime-index') {
    // navigate data time buttons
    /* {
      text: '-year',
      id: 'cnrl-t66',
      active: false
    },
    {
      text: '-month',
      id: 'cnrl-t22',
      active: false
    },
    ,
    {
      text: '+month',
      id: 'cnrl-t4',
      active: false
    },
    {
      text: '+year',
      id: 'cnrl-t5',
      active: false
    } */
    timeIndex =
    [{
      text: '-week',
      id: 'cnrl-t33',
      active: false
    },
    {
      text: '-day',
      id: 'cnrl-t44',
      active: false
    },
    {
      text: 'day',
      id: 'cnrl-t1',
      active: false
    },
    {
      text: '+day',
      id: 'cnrl-t2',
      active: false
    },
    {
      text: '+week',
      id: 'cnrl-t3',
      active: false
    }]
  }
  return timeIndex
}

/**
*  coordinate related simulation computations
* @method coordinateScaffolding
*
*/
CNRLmaster.prototype.coordinateScaffolding = function (refIN) {
  console.log('CRNL----coordinate simulations computations')
  // if contract has links, follow those to source TODO
  let scaffoldingCOORD = {}
  return scaffoldingCOORD
}

/**
*  geometry scaffolding
* @method geometryScaffolding
*
*/
CNRLmaster.prototype.geometryScaffolding = function (refIN) {
  console.log('CRNL----2d 3d geometry of modecules chemistry')
  // if contract has links, follow those to source TODO
  let scaffoldingGEOM = {}
  return scaffoldingGEOM
}

export default CNRLmaster
