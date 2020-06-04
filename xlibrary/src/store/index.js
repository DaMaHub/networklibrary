import Vue from 'vue'
import Vuex from 'vuex'
import NetworkConnect from '@/refflow/cryptoUtility.js'

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
  state: {
    dashboardGrid: [
      { x: 0, y: 0, w: 2, h: 2, i: '0' }, { x: 2, y: 0, w: 10, h: 10, i: '1' } // , { x: 8, y: 0, w: 3, h: 2, i: '2' }, { x: 0, y: 1, w: 7, h: 4, i: '3' }
    ],
    referenceData: dataTitle,
    referenceContract: refContract
  },
  mutations: {
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
      const annonlive = await refFlow.connectNSnetwork(update.network, update.settings)
      console.log(annonlive)
    },
    actionLocalGrid (context, update) {
      console.log('action test watch called')
    }
  },
  modules: {
  }
})
