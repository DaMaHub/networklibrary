<template>
  <div id="reference-tools">
    <div id="add-new-network">
      <li class="view-cnrl">
        <button id="build-new-referencecontract" @click.prevent="newRefContract()">New Reference Contract</button>
      </li>
    </div>
    <div id="view-network-library">
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
          <button id="computeCNRL" @click.prevent="viewRefContracts(CNRLunitseen.text)"> {{ CNRLunitseen.text }}</button>
        </li>
        <li class="view-cnrl">
          <button id="computeCNRL" @click.prevent="viewRefContracts(CNRLpackagingseen.text)"> {{ CNRLpackagingseen.text }}</button>
        </li>
      </ul>
      <view-CNRL v-if="statusCNRL.active" :refTypeLive="referenceLive"></view-CNRL>
      <new-refcontract v-if="newAPIseen.active"></new-refcontract>
    </div>
    <ul>
      <li>
      </li>
    </ul>
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
    newAPIseen:
    {
      active: false,
      text: 'Add new'
    },
    statusCNRL:
    {
      active: false,
      type: ''
    },
    CNRLexperimentseen:
    {
      active: false,
      text: 'Experiments'
    },
    CNRLdatatypesseen:
    {
      active: false,
      text: 'Datatypes'
    },
    CNRLcomputeseen:
    {
      active: false,
      text: 'Compute'
    },
    CNRLunitseen:
    {
      active: false,
      text: 'Unit'
    },
    CNRLpackagingseen:
    {
      active: false,
      text: 'Packaging'
    }
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    newRefContract (ap) {
      console.log('new reference contract')
      this.statusCNRL.active = false
      if (this.newAPIseen.active === false) {
        this.newAPIseen.active = true
        this.newAPIseen.text = 'close'
      } else {
        this.newAPIseen.active = false
        this.newAPIseen.text = 'Add new'
      }
    },
    viewRefContracts (type) {
      console.log('reference type')
      console.log(type)
      this.statusCNRL.active = true
      this.referenceLive = type
      const refContract = {}
      refContract.type = type
      refContract.action = 'GET'
      const refCJSON = JSON.stringify(refContract)
      // ask network library for contracts for this peer
      this.$store.dispatch('sendMessage', refCJSON)
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
</style>
