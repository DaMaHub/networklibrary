<template>
  <div id="reference-tools">
    <div id="add-new-network">
      <div class="view-refconts">
      </div>
      <div class="view-refconts">
        <button id="get-referencecontract" @click.prevent="getRefContracts()">Get Ref. Contract</button>
      </div>
      <!-- <div class="view-refconts">
        <button id="build-modulecontracts" @click.prevent="makeModulecontracts()">Make modules</button>
      </div> -->
      <div class="view-refconts">
        <button id="build-new-referencecontract" @click.prevent="newSetRefContract(startRefContract)">{{ startRefContract.text }}</button>
      </div>
    </div>
    <div id="ref-contracts-view">
      <header>References by type</header>
      <div v-if="startRefContract.active !== true" id="view-network-library">
        <div class="view-cnrl">
          <button id="datatypesCNRL" @click.prevent="viewRefContracts(CNRLdatatypesseen.text)">{{ CNRLdatatypesseen.text }}</button>
        </div>
        <div class="view-cnrl">
          <button id="computeCNRL" @click.prevent="viewRefContracts(CNRLcomputeseen.text)"> {{ CNRLcomputeseen.text }}</button>
        </div>
        <!-- <div class="view-cnrl">
          <button id="unitsCNRL" @click.prevent="viewRefContracts(CNRLunitseen.text)"> {{ CNRLunitseen.text }}</button>
        </div> -->
        <div class="view-cnrl">
          <button id="packaingCNRL" @click.prevent="viewRefContracts(CNRLpackagingseen.text)"> {{ CNRLpackagingseen.text }}</button>
        </div>
        <div class="view-cnrl">
          <button id="visualiseRefs" @click.prevent="viewRefContracts(CNRLvisualiseseen.text)"> {{ CNRLvisualiseseen.text }}</button>
        </div>
        <li class="view-cnrl">
          <button  id="experimentCNRL" @click.prevent="viewRefContracts('experiment')">{{ CNRLexperimentseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="moduleRefs" @click.prevent="viewRefContracts(CNRLmoduleseen.text)"> {{ CNRLmoduleseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button  id="experimentCNRL" @click.prevent="viewRefContracts('peer-board')">{{ CNRNpeerLibraryBoardseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="moduleRefs" @click.prevent="viewRefContracts(CNRLpeerLibraryModules.text)"> {{ CNRLpeerLibraryModules.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="peer-results" @click.prevent="viewRefContracts(peerResults.text)"> {{ peerResults.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="peer-kbl" @click.prevent="viewRefContracts(peerKBL.text)"> {{ peerKBL.text }}</button>
        </li>
      </div>
    </div>
    <view-CNRL v-if="startRefContract.active !== true" :refTypeLive="referenceLive"></view-CNRL>
    <view-results v-if="startRefContract.active !== true && referenceLive === 'peer-results'" :refTypeLive="referenceLive"></view-results>
    <view-ledger v-if="startRefContract.active !== true && referenceLive === 'peer-KBL'" :refTypeLive="referenceLive"></view-ledger>
    <new-refcontract v-if="startRefContract.active"></new-refcontract>
  </div>
</template>

<script>
import ViewCNRL from './viewCNRL.vue'
import ViewResults from './viewResults.vue'
import ViewLedger from './viewLedger.vue'
import NewRefcontract from '@/components/contribute/newRefcontract.vue'

export default {
  name: 'reference-builder',
  components: {
    ViewCNRL,
    ViewResults,
    ViewLedger,
    NewRefcontract
  },
  props: {
    mData: String
  },
  computed: {
    socketLive: function () {
      return this.$store.state.peersocket.socket.message
    }
  },
  data: () => ({
    referenceLive: '',
    startRefContract:
    {
      active: false,
      text: 'New Reference Contract'
    },
    statusCNRL:
    {
      active: true,
      type: ''
    },
    CNRLexperimentseen:
    {
      active: false,
      text: 'board'
    },
    CNRLdatatypesseen:
    {
      active: false,
      text: 'datatype'
    },
    CNRLcomputeseen:
    {
      active: false,
      text: 'compute'
    },
    CNRLunitseen:
    {
      active: false,
      text: 'units'
    },
    CNRLpackagingseen:
    {
      active: false,
      text: 'packaging'
    },
    CNRLmoduleseen:
    {
      active: false,
      text: 'module'
    },
    CNRLvisualiseseen:
    {
      active: false,
      text: 'visualise'
    },
    CNRNpeerLibraryBoardseen:
    {
      active: false,
      text: 'peer-board'
    },
    CNRLpeerLibraryModules:
    {
      active: false,
      text: 'peer-modules'
    },
    peerResults:
    {
      active: false,
      text: 'peer-results'
    },
    peerKBL:
    {
      active: false,
      text: 'peer-KBL'
    }
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    newSetRefContract (ap) {
      // set describe data tools hidden
      this.$store.dispatch('actionDatadescribe', false)
      if (this.startRefContract.active === false) {
        this.startRefContract.active = true
        this.startRefContract.text = 'close'
      } else {
        this.startRefContract.active = false
        this.startRefContract.text = 'New ref. contract'
      }
    },
    getRefContracts () {
      this.statusCNRL.active = true
      this.referenceLive = 'datatype'
      const refContract = {}
      refContract.type = 'library'
      refContract.reftype = 'publiclibrary'
      refContract.action = 'GET'
      const refCJSON = JSON.stringify(refContract)
      // ask network library for contracts for this peer
      this.$store.dispatch('actionGetRefContract', refCJSON)
    },
    viewRefContracts (type) {
      // ask network library for contracts for this peer
      this.referenceLive = type
    },
    makeModulecontracts () {
      const refModContract = {}
      refModContract.reftype = 'module'
      refModContract.action = 'PUT'
      const refModJSON = JSON.stringify(refModContract)
      // ask network library for contracts for this peer
      this.$store.dispatch('actionMakeModuleRefContract', refModJSON)
    },
    makeVisuailsecontracts () {
      const refVisContract = {}
      refVisContract.reftype = 'visualise'
      refVisContract.action = 'PUT'
      const refVisJSON = JSON.stringify(refVisContract)
      // ask network library for contracts for this peer
      this.$store.dispatch('actionMakeVisualiseRefContract', refVisJSON)
    }
  }
}
</script>

<style scoped>
#add-new-network {
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
  justify-content: end;
}

.view-refconts {
  display: grid;
  justify-content: end;
  font-size: 1.2em;
  border-bottom: 1px dashed lightgrey;
}

#reference-tools {
  border: 1px solid white;
}

#ref-contracts-view {
  display: grid;
  justify-content: center;
  margin-bottom: 1em;
}

#view-network-library {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 300px;
  justify-content: center;
}

.view-cnrl {
  display: grid;
}

#build-new-referencecontract {
  background-color: #e6ffee;
}

</style>
