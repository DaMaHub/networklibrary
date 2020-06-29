import Vue from 'vue'
import Vuex from 'vuex'
import NetworkConnect from '@/refflow/cryptoUtility.js'
import modules from './modules'

const refFlow = new NetworkConnect()
Vue.use(Vuex)

const dataTitle = {}
dataTitle[0] = { title: 'Data', type: 'source' }
dataTitle[1] = { title: 'Curation', type: 'reference-builder' }
// dataTitle[2] = { title: 'Index', type: 'indexes' }
// dataTitle[3] = { title: 'Imageviewer', type: 'imageview' }

const refContract = {}
// refContract.Experiments = [{ title: 'Fitness', type: 'experiment' }, { title: 'pollution', type: 'experiment' }]
refContract.Devices = [{ title: 'Fitbit', type: 'device' }, { title: 'iWatch', type: 'Devices' }]
refContract.Datatypes = [{ title: 'Heart', type: 'datatype' }, { title: 'Steps', type: 'datatype' }]
refContract.Compute = [{ title: 'None', type: 'compute' }, { title: 'average', type: 'Compute' }]
refContract.Unit = [{ title: 'time', type: 'unit' }, { title: 'distance', type: 'unit' }]
refContract.Visualise = [{ title: '2DImageviewer', type: 'visualise' }, { title: '3DImageviewer', type: 'Visualise' }]

// dataTitle['compute'] = [{ title: 'Preservation', type: 'indexes' }, { title: 'Environment', type: 'indexes' }

export default new Vuex.Store({
  modules,
  state: {
    dashboardGrid: [
      { x: 0, y: 0, w: 2, h: 2, i: '0' }, { x: 2, y: 0, w: 10, h: 10, i: '1' } // , { x: 8, y: 0, w: 3, h: 2, i: '2' }, { x: 0, y: 1, w: 7, h: 4, i: '3' }
    ],
    referenceData: dataTitle,
    referenceContract: refContract,
    newRefcontractForm: {},
    newPackingForm:
    {
      apicolumns: [],
      apicolHolder: []
    },
    DTslive: [
      { name: 'heart rate', id: 1 },
      { name: 'steps', id: 2 },
      { name: 'temperature', id: 3 },
      { name: 'humidity', id: 4 },
      { name: 'rainfall', id: 5 },
      { name: 'error mgt', id: 6 },
      { name: 'average', id: 7 },
      { name: 'air pressure', id: 8 },
      { name: 'p10', id: 9 },
      { name: 'p2.5', id: 10 }
    ]
  },
  mutations: {
    ADD_REFCONTRACT_PRIMARY (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'primary', inVerified)
    },
    ADD_REFCONTRACT_TYPE (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'type', inVerified)
    },
    ADD_REFCONTRACT_NAME (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'name', inVerified)
    },
    ADD_REFCONTRACT_DESCRIP (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'description', inVerified)
    },
    ADD_REFCONTPACK_PRIMARY (state, inVerified) {
      Vue.set(state.newPackingForm, 'primary', inVerified)
    },
    ADD_REFCONTPACK_NAME (state, inVerified) {
      Vue.set(state.newPackingForm, 'name', inVerified)
    },
    ADD_REFCONTPACK_DESCRIP (state, inVerified) {
      Vue.set(state.newPackingForm, 'description', inVerified)
    },
    ADD_REFCONTPACK_API (state, inVerified) {
      Vue.set(state.newPackingForm, 'api', inVerified)
    },
    ADD_REFCONTPACK_APIBASE (state, inVerified) {
      Vue.set(state.newPackingForm, 'apibase', inVerified)
    },
    ADD_REFCONTPACK_APIPATH (state, inVerified) {
      Vue.set(state.newPackingForm, 'apipath', inVerified)
    },
    ADD_REFCONTPACK_APICOL (state, inVerified) {
      console.log('api COLUM')
      console.log(inVerified)
      let colCount
      if (state.newPackingForm.apicolumns.length === 0) {
        colCount = 0
      } else {
        colCount = state.newPackingForm.apicolumns.length + 1
      }
      const newColumn = {}
      newColumn.count = colCount
      newColumn.name = inVerified
      state.newPackingForm.apicolumns.push(newColumn)
      state.newPackingForm.apicolHolder.push([])
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      const peerLive = await refFlow.connectPeerNSnetwork(update.network, update.settings)
      // console.log('peer star returned')
      console.log(peerLive)
      // context.commit('setAuthorisation', true)
    },
    async annonconnectNSnetwork (context, update) {
      console.log('annon connect')
      // const annonlive = await refFlow.connectNSnetwork(update.network, update.settings)
      // console.log(annonlive)
    },
    actionLocalGrid (context, update) {
      console.log('action test watch called')
    },
    sendMessage2 (context, message) {
      console.log('action for ws')
      // forward for type and forward to peerLink
      Vue.prototype.$socket.send(message)
    },
    buildRefcontractPrimary (context, update) {
      context.commit('ADD_REFCONTRACT_PRIMARY', update)
    },
    buildRefcontractType (context, update) {
      context.commit('ADD_REFCONTRACT_TYPE', update)
    },
    buildRefContractName (context, update) {
      context.commit('ADD_REFCONTRACT_NAME', update)
    },
    buildRefContractDescription (context, update) {
      context.commit('ADD_REFCONTRACT_DESCRIP', update)
    },
    buildRefPackagePrimary (context, update) {
      context.commit('ADD_REFCONTPACK_PRIMARY', update)
    },
    buildRefPackageName (context, update) {
      context.commit('ADD_REFCONTPACK_NAME', update)
    },
    buildRefPackageDescription (context, update) {
      context.commit('ADD_REFCONTPACK_DESCRIP', update)
    },
    buildRefPackageAPI (context, update) {
      context.commit('ADD_REFCONTPACK_API', update)
    },
    buildRefPackageAPIbase (context, update) {
      context.commit('ADD_REFCONTPACK_APIBASE', update)
    },
    buildRefPackageAPIpath (context, update) {
      context.commit('ADD_REFCONTPACK_APIPATH', update)
    },
    buildRefPackageColumns (context, update) {
      context.commit('ADD_REFCONTPACK_APICOL', update)
    }
  },
  strict: false // process.env.NODE_ENV !== 'production'
})
