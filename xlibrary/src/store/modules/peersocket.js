import Vue from 'vue'
import RCcomposer from '../../mixin/rcComposer.js'
const refcontComposerLive = new RCcomposer()

export default {
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  getters: {
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      this.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      console.log('peerLink response')
      console.log(message.data)
      const backJSON = JSON.parse(message.data)
      console.log('back message')
      console.log(backJSON)
      if (backJSON.stored === true) {
        // success in saving reference contract
        console.log('save successful')
      } else {
        // query back from peer data store
        // pass to sort data into ref contract types
        const segmentedRefContracts = refcontComposerLive.refcontractSperate(backJSON)
        console.log('segmentated contracts')
        console.log(segmentedRefContracts)
        this.state.referenceContract = segmentedRefContracts
      }
    }
  },
  actions: {
    sendMessage (context, message) {
      console.log('Ref Contract preapre peerLink')
      console.log(message)
      let prepareRefContract = {}
      if (message.reftype === 'new-datatype') {
        const localData = this.state.newRefcontractForm
        prepareRefContract = refcontComposerLive.dataTypePrepare(localData)
      } else if (message.reftype === 'new-packaging') {
        prepareRefContract = refcontComposerLive.packagingPrepare(this.state.newPackingForm)
      } else if (message.reftype === 'new-compute') {
        prepareRefContract = refcontComposerLive.computePrepare(this.state.newComputeForm)
      } else if (message.reftype === 'new-visualise') {
        prepareRefContract = refcontComposerLive.visualisePrepare(this.state.newVisualiseForm)
      }
      console.log(prepareRefContract)
      const referenceContractReady = JSON.stringify(prepareRefContract)
      Vue.prototype.$socket.send(referenceContractReady)
    },
    actionGetRefContract (context, message) {
      console.log('action for ws')
      Vue.prototype.$socket.send(message)
    },
    actionMakeVisualiseRefContract (context, message) {
      console.log('setup Visualise ref contract')
      console.log(message)
      // Vue.prototype.$socket.send(message)
    },
    actionMakeModuleRefContract (context, update) {
      console.log('setup Module Contracts')
      const moduleContracts = []
      const dataCNRLbundle = {}
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      dataCNRLbundle.reftype = 'module'
      dataCNRLbundle.primary = 'genesis'
      dataCNRLbundle.description = 'Question for network experiment'
      dataCNRLbundle.concept = 'cnrl-001234543212'
      dataCNRLbundle.grid = []
      moduleContracts.push(dataCNRLbundle)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle2 = {}
      dataCNRLbundle2.reftype = 'module'
      dataCNRLbundle2.primary = 'genesis'
      dataCNRLbundle2.description = 'data source(s) for network experiment'
      dataCNRLbundle2.grid = []
      moduleContracts.push(dataCNRLbundle2)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle3 = {}
      dataCNRLbundle3.reftype = 'module'
      dataCNRLbundle3.primary = 'genesis'
      dataCNRLbundle3.concept = 'cnrl-001297343304'
      dataCNRLbundle3.grid = []
      moduleContracts.push(dataCNRLbundle3)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle4 = {}
      dataCNRLbundle4.reftype = 'module'
      dataCNRLbundle4.primary = 'genesis'
      dataCNRLbundle4.concept = 'cnrl-001234543304'
      dataCNRLbundle4.grid = []
      moduleContracts.push(dataCNRLbundle4)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle5 = {}
      dataCNRLbundle5.reftype = 'module'
      dataCNRLbundle5.primary = 'cnrl-primary'
      dataCNRLbundle5.concept = 'cnrl-001234543213'
      dataCNRLbundle5.grid = []
      moduleContracts.push(dataCNRLbundle5)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle6 = {}
      dataCNRLbundle6.reftype = 'module'
      dataCNRLbundle6.primary = 'genesis'
      dataCNRLbundle6.concept = 'cnrl-001234543214'
      dataCNRLbundle6.grid = []
      dataCNRLbundle6.dtcompute = []
      dataCNRLbundle6.dtresult = []
      dataCNRLbundle6.category = []
      dataCNRLbundle6.compute = ''
      dataCNRLbundle6.controlpanel = []
      dataCNRLbundle6.automation = false
      dataCNRLbundle6.time = { realtime: 0, timeseg: [], startperiod: '' }
      moduleContracts.push(dataCNRLbundle6)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle7 = {}
      dataCNRLbundle7.reftype = 'module'
      dataCNRLbundle7.primary = 'genesis'
      dataCNRLbundle7.concept = 'cnrl-001234543458'
      dataCNRLbundle7.grid = []
      dataCNRLbundle7.rules = []
      dataCNRLbundle7.visualise = ''
      moduleContracts.push(dataCNRLbundle7)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle8 = {}
      dataCNRLbundle8.reftype = 'module'
      dataCNRLbundle8.primary = 'genesis'
      dataCNRLbundle8.concet = 'cnrl-001234543215'
      dataCNRLbundle8.grid = []
      moduleContracts.push(dataCNRLbundle8)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle9 = {}
      dataCNRLbundle9.reftype = 'module'
      dataCNRLbundle9.primary = 'genesis'
      dataCNRLbundle9.concept = 'cnrl-001234543216'
      dataCNRLbundle9.grid = []
      moduleContracts.push(dataCNRLbundle9)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle10 = {}
      dataCNRLbundle10.reftype = 'module'
      dataCNRLbundle10.primary = 'genesis'
      dataCNRLbundle10.concept = 'cnrl-001234543217'
      dataCNRLbundle10.grid = []
      moduleContracts.push(dataCNRLbundle10)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle11 = {}
      dataCNRLbundle11.reftype = 'module'
      dataCNRLbundle11.primary = 'genesis'
      dataCNRLbundle11.concept = 'cnrl-001234543218'
      dataCNRLbundle11.grid = []
      moduleContracts.push(dataCNRLbundle11)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle12 = {}
      dataCNRLbundle12.reftype = 'module'
      dataCNRLbundle12.primary = 'genesis'
      dataCNRLbundle12.concept = 'cnrl-001234543219'
      dataCNRLbundle12.grid = []
      moduleContracts.push(dataCNRLbundle12)
      // CNRL implementation contract e.g. from mobile phone sqlite table structure
      const dataCNRLbundle13 = {}
      dataCNRLbundle13.reftype = 'module'
      dataCNRLbundle13.primary = 'genesis'
      dataCNRLbundle13.concept = 'cnrl-001234543220'
      dataCNRLbundle13.grid = []
      moduleContracts.push(dataCNRLbundle13)
      console.log(moduleContracts)
      for (const mc of moduleContracts) {
        console.log(mc)
        const prepareModule = refcontComposerLive.modulePrepare(mc)
        const referenceContractReady = JSON.stringify(prepareModule)
        Vue.prototype.$socket.send(referenceContractReady)
      }
    }
  }
}
