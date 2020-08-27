import Vue from 'vue'
import RCcomposer from '../../mixin/rcComposer.js'
import KBIDcomposer from '../../mixin/kbidComposer.js'
const refcontComposerLive = new RCcomposer()
const kbidComposerLive = new KBIDcomposer()

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
      } else if (backJSON.type === 'publickey') {
        this.state.publickey = backJSON.pubkey
      } else {
        // query back from peer data store
        // pass to sort data into ref contract types
        const segmentedRefContracts = refcontComposerLive.refcontractSperate(backJSON)
        const segmentedRefContracts2 = refcontComposerLive.refcontractSperate(backJSON)
        const segmentedRefContracts3 = refcontComposerLive.refcontractSperate(backJSON)
        this.state.packagingDatatypes = segmentedRefContracts2.datatype
        this.state.referenceContract = segmentedRefContracts
        this.state.dataTypesLive = segmentedRefContracts3.datatype
      }
    }
  },
  actions: {
    sendMessage (context, message) {
      console.log('Ref Contract preapre peerLink')
      // console.log(message)
      let prepareRefContract = {}
      if (message.reftype === 'new-datatype') {
        const localData = this.state.newRefcontractForm
        prepareRefContract = refcontComposerLive.datatypeRefLive.dataTypePrepare(localData)
      } else if (message.reftype === 'new-packaging') {
        // check if category or packaging need bundled
        prepareRefContract = refcontComposerLive.packagingRefLive.packagingPrepare(this.state.newPackingForm)
        // reset the form
      } else if (message.reftype === 'new-compute') {
        prepareRefContract = refcontComposerLive.computeRefLive.computePrepare(this.state.newComputeForm)
      } else if (message.reftype === 'new-visualise') {
        prepareRefContract = refcontComposerLive.visualiseRefLive.visualisePrepare(this.state.newVisualiseForm)
      }
      console.log(prepareRefContract)
      const referenceContractReady = JSON.stringify(prepareRefContract)
      Vue.prototype.$socket.send(referenceContractReady)
      // reset the form
      if (message.reftype === 'new-datatype') {
        const formKeys = Object.keys(this.state.newRefcontractForm)
        for (const fk of formKeys) {
          Vue.set(this.state.newRefcontractForm, fk, {})
        }
      } else if (message.reftype === 'new-packaging') {
        const formKeys = Object.keys(this.state.newPackingForm)
        for (const fk of formKeys) {
          console.log(fk)
          if (fk === 'category' || fk === 'tidy') {
            Vue.set(this.state.newPackingForm, fk, {})
          } else {
            Vue.set(this.state.newPackingForm, fk, [])
          }
        }
        // need to reset datatype list
        this.state.packagingDatatypes = this.state.dataTypesLive
        // reset the holder matcher
        console.log(this.state.newPackingForm.apicolHolder)
        Vue.set(this.state.newPackingForm, 'apicolHolder', [])
        this.state.newPackingForm.apicolumns = []
        let colCount = 0
        if (this.state.newPackingForm.apicolumns.length === 0) {
          colCount = 1
        } else {
          colCount = this.state.newPackingForm.apicolumns.length + 1
        }
        console.log(colCount)
        this.state.newPackingForm.apicolHolder.push([])
      } else if (message.reftype === 'new-compute') {
        const formKeys = Object.keys(this.state.newComputeForm)
        for (const fk of formKeys) {
          Vue.set(this.state.newComputeForm, fk, {})
        }
      } else if (message.reftype === 'new-visualise') {
        const formKeys = Object.keys(this.state.newVisualiseForm)
        for (const fk of formKeys) {
          Vue.set(this.state.newVisualiseForm, fk, {})
        }
      }
    },
    actionPublickey (context, message) {
      console.log('public key get')
      const pubkeyGet = {}
      pubkeyGet.reftype = 'viewpublickey'
      Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
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
    actionMakeKBIDtemplate (context, message) {
      console.log('make KBID template entry')
      console.log(message)
      const prepareKBIDtemplate = kbidComposerLive.kbidTemplateNew(message)
      console.log(prepareKBIDtemplate)
      const kbidTemplateReady = JSON.stringify(prepareKBIDtemplate)
      console.log(kbidTemplateReady)
      // Vue.prototype.$socket.send(kbidTemplateReady)
    },
    actionMakeKBIDentry (context, message) {
      console.log('make KBID entry')
      console.log(message)
      const prepareKBIDentry = kbidComposerLive.kbidEntry(message)
      console.log(prepareKBIDentry)
      const kbidEntryReady = JSON.stringify(prepareKBIDentry)
      console.log(kbidEntryReady)
      // Vue.prototype.$socket.send(kbidEntryReady)
    },
    actionPeersync (context, message) {
      console.log('peersync')
      console.log(message)
      const peerSync = {}
      peerSync.reftype = 'replicatekey'
      peerSync.publickey = message
      const peerSyncJSON = JSON.stringify(peerSync)
      Vue.prototype.$socket.send(peerSyncJSON)
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
        const prepareModule = refcontComposerLive.moduleComposer(mc)
        const referenceContractReady = JSON.stringify(prepareModule)
        Vue.prototype.$socket.send(referenceContractReady)
      }
    }
  }
}
