import Vue from 'vue'
import LibComposer from 'librarycomposer'
const LibLib = new LibComposer()

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
      this.state.connectStatus = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
      this.state.connectStatus = false
      this.state.peerauthStatus = false
    },
    SOCKET_ONERROR (state, event) {
      this.state.connectStatus = false
      this.state.peerauthStatus = false
      // remote.getCurrentWindow().close()
      // inform Peer connection to network lost
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      // console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
      this.state.peerauthStatus = false
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      const backJSON = JSON.parse(message.data)
      // console.log(backJSON)
      if (backJSON.stored === true) {
        // success in saving reference contract
        // safeFLOW inflow
      } else if (backJSON.type === 'auth') {
        if (backJSON.type === 'auth') {
          if (backJSON.auth !== false) {
            // set remove welcome message
            this.state.peerauthStatus = true
            // set the JWT for this session
            this.state.jwttoken = backJSON.jwt
            // get starting experiments
            const refContractp = {}
            refContractp.type = 'library'
            refContractp.reftype = 'publiclibrary'
            refContractp.action = 'GET'
            refContractp.jwt = this.state.jwttoken
            const refCJSONp = JSON.stringify(refContractp)
            Vue.prototype.$socket.send(refCJSONp)
            // network library updates?
            const refContract = {}
            refContract.type = 'library'
            refContract.reftype = 'privatelibrary'
            refContract.action = 'GET'
            refContract.jwt = this.state.jwttoken
            const refCJSON = JSON.stringify(refContract)
            Vue.prototype.$socket.send(refCJSON)
            // ask for datastore public keys
            //  need call, added manualy for now  SET_ASK_KEYMANAGEMENT(state)
            this.state.publickeys = []
            const pubkeyGet = {}
            pubkeyGet.type = 'library'
            pubkeyGet.reftype = 'keymanagement'
            pubkeyGet.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
            // get datastore
            const getWarmPeers = {}
            getWarmPeers.type = 'library'
            getWarmPeers.reftype = 'warm-peers'
            getWarmPeers.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(getWarmPeers))
            // get the peer start lifeboard
            const getLifeboard = {}
            getLifeboard.type = 'library'
            getLifeboard.reftype = 'peerLifeboard'
            getLifeboard.jwt = this.state.jwttoken
            Vue.prototype.$socket.send(JSON.stringify(getLifeboard))
          }
        } else {
          console.log('failed login')
        }
      } else if (backJSON.type === 'peerprivate') {
        // peer private library contracts
        this.state.livePeerRefContIndex = backJSON.referenceContracts
        this.state.networkPeerExpModules = backJSON.networkPeerExpModules
        /* for (const exl of backJSON.networkPeerExpModules) {
          const experBundle = {}
          experBundle.cnrl = exl.exp.key
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = exl.exp
          // experBundle.modules = VisualUtility.orderModules(exl.modules, 'private')
          const objectPropC = exl.exp.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle) */
        // }
        // prepare PEER JOINED LIST
        // let gridPeer = ToolUtility.prepareJoinedNXPlist(backJSON.networkPeerExpModules)
        // this.state.joinedNXPlist = gridPeer
      } else if (backJSON.type === 'publickey') {
        this.state.publickeys.push(backJSON.pubkey)
      } else if (backJSON.type === 'warm-peers') {
        this.state.warmNetwork = []
        for (const wp of backJSON.data) {
          this.state.warmNetwork.push(wp.value)
        }
      } else if (backJSON.type === 'publiclibrary') {
        // save copy of ref contract indexes
        this.state.liveRefContIndex = backJSON.referenceContracts
        // prepare NPXs in NETWORK
        this.state.networkExpModules = backJSON.networkExpModules
        /* let gridAnnon = ToolUtility.prepareAnnonNXPlist(backJSON.networkExpModules)
        this.state.NXPexperimentList = gridAnnon
        // set the dashboard toolbar status settings
        for (const exl of backJSON.networkExpModules) {
          let experBundle = {}
          experBundle.cnrl = exl.exp.key
          experBundle.status = false
          experBundle.active = false
          experBundle.contract = exl.exp
          experBundle.modules = VisualUtility.orderModules(exl.modules, 'public') // exl.modules
          const objectPropC = exl.exp.key
          Vue.set(this.state.experimentStatus, objectPropC, experBundle)
        } */
      }
    },
    CLEAR_FILE_FEEDBACK (state, update) {
      this.state.fileFeedback = {}
    }
  },
  actions: {
    sendMessage (context, message) {
      let prepareRefContract = {}
      if (message.reftype === 'new-datatype') {
        const localData = this.state.newRefcontractForm
        prepareRefContract = LibLib.liveComposer.datatypeComposer(localData)
      } else if (message.reftype === 'new-packaging') {
        // check if category or packaging need bundled
        prepareRefContract = LibLib.liveComposer.packagingComposer(this.state.newPackingForm)
        // reset the form
      } else if (message.reftype === 'new-compute') {
        prepareRefContract = LibLib.liveComposer.computeComposer(this.state.newComputeForm)
      } else if (message.reftype === 'new-visualise') {
        prepareRefContract = LibLib.liveComposer.visualiseComposer(this.state.newVisualiseForm)
      }
      prepareRefContract.jwt = context.rootState.jwttoken
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
          if (fk === 'category' || fk === 'tidy') {
            Vue.set(this.state.newPackingForm, fk, {})
          } else {
            Vue.set(this.state.newPackingForm, fk, [])
          }
        }
        // need to reset datatype list
        this.state.packagingDatatypes = this.state.dataTypesLive
        // reset the holder matcher
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
      const pubkeyGet = {}
      pubkeyGet.type = 'library'
      pubkeyGet.reftype = 'viewpublickey'
      pubkeyGet.jwt = context.rootState.jwttoken
      Vue.prototype.$socket.send(JSON.stringify(pubkeyGet))
    },
    actionGetRefContract (context, message) {
      const updateMessage = JSON.parse(message)
      updateMessage.jwt = context.rootState.jwttoken
      const newString = JSON.stringify(updateMessage)
      Vue.prototype.$socket.send(newString)
    },
    actionMakeVisualiseRefContract (context, message) {
      // Vue.prototype.$socket.send(message)
    },
    actionMakeKBIDtemplate (context, message) {
      // const prepareKBIDtemplate = LibLib.liveKBID.kbidTemplateNew(message)
      // console.log(prepareKBIDtemplate)
      // const kbidTemplateReady = JSON.stringify(prepareKBIDtemplate)
      // console.log(kbidTemplateReady)
      // Vue.prototype.$socket.send(kbidTemplateReady)
    },
    actionMakeKBIDentry (context, message) {
      // const prepareKBIDentry = LibLib.liveKBID.kbidEntry(message)
      // console.log(prepareKBIDentry)
      // const kbidEntryReady = JSON.stringify(prepareKBIDentry)
      // console.log(kbidEntryReady)
      // Vue.prototype.$socket.send(kbidEntryReady)
    },
    actionPeersync (context, message) {
      const peerSync = {}
      peerSync.type = 'library'
      peerSync.reftype = 'replicatekey'
      peerSync.publickey = message
      peerSync.jwt = context.rootState.jwttoken
      const peerSyncJSON = JSON.stringify(peerSync)
      Vue.prototype.$socket.send(peerSyncJSON)
    },
    actionMakeModuleRefContract (context, update) {
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
      for (const mc of moduleContracts) {
        console.log(mc)
        // const prepareModule = refcontComposerLive.moduleComposer(mc)
        // const referenceContractReady = JSON.stringify(prepareModule)
        // Vue.prototype.$socket.send(referenceContractReady)
      }
    },
    actionFileconvert (context, update) {
      var fileInfo = {}
      fileInfo.type = 'library'
      fileInfo.reftype = 'convert-csv-json'
      fileInfo.data = update
      fileInfo.jwt = context.rootState.jwttoken
      const fileJSON = JSON.stringify(fileInfo)
      Vue.prototype.$socket.send(fileJSON)
    },
    actionJSONFileconvert (context, update) {
      var fileInfo = {}
      fileInfo.type = 'library'
      fileInfo.reftype = 'save-json-json'
      fileInfo.data = update
      fileInfo.jwt = context.rootState.jwttoken
      const fileJSON = JSON.stringify(fileInfo)
      Vue.prototype.$socket.send(fileJSON)
    },
    actionClearFileFeeback (context, update) {
      context.commit('CLEAR_FILE_FEEDBACK', update)
    },
    actionCloudSignin (context, update) {
      const cloudInfo = {}
      cloudInfo.type = 'safeflow'
      cloudInfo.reftype = 'ignore'
      cloudInfo.action = 'cloudauth'
      cloudInfo.network = null // update.network
      cloudInfo.settings = null // update.settings
      cloudInfo.data = update
      const cloudAuth = JSON.stringify(cloudInfo)
      Vue.prototype.$socket.send(cloudAuth)
    }
  }
}
