<template>
  <div id="reference-tools">builder -- {{ startRefContract }}
    <div id="add-new-network">
      <li class="view-cnrl">
        <button id="get-referencecontract" @click.prevent="getRefContracts()">Get Ref. Contract</button>
      </li>
      <li class="view-cnrl">
        <button id="build-modulecontracts" @click.prevent="makeModulecontracts()">Make modules</button>
      </li>
      <li class="view-cnrl">
        <button id="build-new-referencecontract" @click.prevent="newSetRefContract(startRefContract)">{{ startRefContract.text }}</button>
      </li>
    </div>
    <div v-if="startRefContract.active !== true" id="view-network-library">
      <header>References by type</header>
      <ul>
        <!-- <li class="view-cnrl">
          <button  id="experimentCNRL" @click.prevent="viewRefcontracts(CNRLexperimentseen.text)">{{ CNRLexperimentseen.text }}</button>
        </li> -->
        <li class="view-cnrl">
          <button id="datatypesCNRL" @click.prevent="viewRefContracts(CNRLdatatypesseen.text)">{{ CNRLdatatypesseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="computeCNRL" @click.prevent="viewRefContracts(CNRLcomputeseen.text)"> {{ CNRLcomputeseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="unitsCNRL" @click.prevent="viewRefContracts(CNRLunitseen.text)"> {{ CNRLunitseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="packaingCNRL" @click.prevent="viewRefContracts(CNRLpackagingseen.text)"> {{ CNRLpackagingseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="moduleRefs" @click.prevent="viewRefContracts(CNRLmoduleseen.text)"> {{ CNRLmoduleseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="visualiseRefs" @click.prevent="viewRefContracts(CNRLvisualiseseen.text)"> {{ CNRLvisualiseseen.text }}</button>
        </li>
      </ul>
      <view-CNRL v-if="statusCNRL.active" :refTypeLive="referenceLive"></view-CNRL>
    </div>
    <new-refcontract v-if="startRefContract.active"></new-refcontract>
  </div>
</template>

<script>
import ViewCNRL from './viewCNRL.vue'
import NewRefcontract from '@/components/contribute/newRefcontract.vue'

export default {
  name: 'reference-builder',
  components: {
    ViewCNRL,
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
      text: 'experiments'
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
      if (this.startRefContract.active === false) {
        this.startRefContract.active = true
        this.startRefContract.text = 'close'
      } else {
        this.startRefContract.active = false
        this.startRefContract.text = 'Add new ref contract'
      }
    },
    getRefContracts () {
      this.statusCNRL.active = true
      this.referenceLive = 'datatype'
      const refContract = {}
      refContract.reftype = 'datatype'
      refContract.action = 'GET'
      const refCJSON = JSON.stringify(refContract)
      // ask network library for contracts for this peer
      this.$store.dispatch('actionGetRefContract', refCJSON)
    },
    viewRefContracts (type) {
      console.log('reference type')
      console.log(type)
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

<style >
#add-new-network {
  text-align: right;
}

#reference-tools {
  border: 2px solid green;
}

#add-new-network {
}

.view-cnrl {
  display: inline-block;
  border: 1px solid red;
}

#build-new-referencecontract {
  background-color: #e6ffee;
}

</style>
