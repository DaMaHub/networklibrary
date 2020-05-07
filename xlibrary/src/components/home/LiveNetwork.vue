<template>
  <div class="experiment-info" id="live-network-experiment">
    <div class="live-network-header">
      <ul>
        <li class="network-toolbar">
          Live network experiments
        </li>
        <li class="network-toolbar">
          <form id="search">
            Search <input name="query" v-model="searchQuery">
          </form>
        </li>
        <li class="network-toolbar">
          <button type="button" class="btn" @click="newExperiment()">new</button>
          <new-networkexperiment v-show="isModalNewNetworkExperiment" @close="closeModalNewN1">
            <template v-slot:header>
            <!-- The code below goes into the header slot -->
              NEW N=1 Network Experiment
            </template>
            <template v-slot:body>
            <!-- The code below goes into the header slot -->
              <header>DOWNLOAD MOBILE APPLICACTION & CONNECT DEVICE</header>
            </template>
            <template v-slot:connect>
              <div> Compatible Devices: </div>
            </template>
            <template v-slot:dashboard>
              <div>
              Dashboard Layout
              </div>
            </template>
            <template v-slot:submit-join>
              <button>Submit new N=1 exerpiment to network</button>
            </template>
          </new-networkexperiment>
        </li>
      </ul>
    </div>
    <experiment-network v-if="peerNXPListlive.data"
      class="experiment-info"
      :experiments="peerNXPListlive.data"
      :columns="peerNXPListlive.columns"
      :filter-key="searchQuery">
    </experiment-network>
    NETWORK
    <experiment-network
      class="experiment-info" v-if="networkNXPListlive.data"
      :experiments="networkNXPListlive.data"
      :columns="networkNXPListlive.columns"
      :filter-key="searchQuery">
    </experiment-network>
  </div>
</template>

<script>
import ExperimentNetwork from '@/components/grids/ExperimentNetwork.vue'
import NewNetworkexperiment from '@/components/experiments/NewNetworkExperiment.vue'

export default {
  name: 'LiveNetwork',
  components: {
    ExperimentNetwork,
    NewNetworkexperiment
  },
  props: {
  },
  computed: {
    peerNXPListlive: function () {
      return this.$store.state.experimentList
    },
    networkNXPListlive: function () {
      return this.$store.state.NXPexperimentList
    }
  },
  data () {
    return {
      searchQuery: '',
      isModalNewNetworkExperiment: false
    }
  },
  methods: {
    newExperiment () {
      this.isModalNewNetworkExperiment = true
    },
    closeModalNewN1 () {
      this.isModalNewNetworkExperiment = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.experiment-info {
  border: 0px solid grey;
  width: 98%;
  margin: auto;
  text-align: center;
}

.network-toolbar {
  display: inline-block;
  padding-left: 10px;
}
</style>
