<template>
  <div id="reference-tools">
    <div id="add-new-network">
      <header>References by type</header>
      <ul>
        <li>
          <button class="new-describe-cnrl" @click.prevent="newDesAPI($event)">New</button>
        </li>
        <li>
          <button class="view-cnrl" id="experimentCNRL" @click.prevent="viewCNRL(CNRLexperimentseen.text)">{{ CNRLexperimentseen.text }}</button>
        </li>
        <li>
          <button class="view-cnrl" id="datatypesCNRL" @click.prevent="viewCNRL(CNRLdatatypesseen.text)">{{ CNRLdatatypesseen.text }}</button>
        </li>
        <li>
          <button class="view-cnrl"  id="computeCNRL" @click.prevent="viewCNRL(CNRLcomputeseen.text)"> {{ CNRLcomputeseen.text }}</button>
        </li>
        <li>
          <button class="view-cnrl"  id="computeCNRL" @click.prevent="viewCNRL(CNRLunitseen.text)"> {{ CNRLunitseen.text }}</button>
        </li>
      </ul>
      <!-- <new-API v-if="newAPIseen.active"></new-API> -->
      <view-CNRL v-if="statusCNRL.active" :refTypeLive="referenceLive"></view-CNRL>
    </div>
    <ul>
      <li>
      </li>
    </ul>
  </div>
</template>

<script>
import ViewCNRL from './viewCNRL.vue'
export default {
  name: 'reference-builder',
  components: {
    ViewCNRL
  },
  props: {
    mData: String
  },
  computed: {
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
    }
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    newDesAPI (ap) {
      if (this.newAPIseen.active === false) {
        this.newAPIseen.active = true
        this.newAPIseen.text = 'close'
      } else {
        this.newAPIseen.active = false
        this.newAPIseen.text = 'Add new'
      }
    },
    viewCNRL (type) {
      console.log('reference type')
      console.log(type)
      this.statusCNRL.active = true
      this.referenceLive = type
    }
  }
}
</script>

<style>
</style>
