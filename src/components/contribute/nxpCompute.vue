<template>
  <div id="compute-nxp">
    <header>ANSWER-COMPUTE:</header>
    <div id="prime-compute">
      <form id="compute_form" name="compute_form" method="post" action="#">
        <ul>
          <li class="compute-summary">
            Prime compute:<input v-model="compute.text" placeholder="prime">
          </li>
          <li class="compute-summary">
            Github discussion:<input v-model="compute.forum" placeholder="git link">
          </li>
          <li class="compute-summary">
            <button @click.prevent="saveCompute($event)">Save Compute</button>
          </li>
        </ul>
      </form>
      <div id="view-controls-compute">
        <a href="#" id="open-compute" @click.prevent="openCompute(oc)">{{ oc.name }}</a>
      </div>
      <div class="compute-code">
        <a href="#" id="add-compute" >add</a>
      </div>
    </div>
    <div id="existing-computes">
      <ul>
        <li v-for="kbidl in nxpKbidsList"> kbids {{ nxpKbidsList }} {{ nxpKbids }}
          <compute-context :liveCompute="nxpKbids[kbidl].science"></compute-context>
          <!-- <nxp-outcome></nxp-outcome> -->
          <!-- <nxp-data></nxp-data> -->
          <knowledge-Live :liveData="nxpKbids[kbidl]" ></knowledge-Live>
          <nxp-visualise></nxp-visualise>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import computeContext from '../compute/computeContext.vue'
import KnowledgeLive from '@/components/toolbar/knowledgeLive'
import nxpVisualise from '@/components/healthscience/nxp/nxpVisualise.vue'

export default {
  name: 'nxp-compute',
  components: {
    computeContext,
    KnowledgeLive,
    nxpVisualise
  },
  computed: {
    nxpKbidsList: function () {
      return this.$store.state.liveNXPbundleList
    },
    nxpKbids: function () {
      return this.$store.state.liveNXPbundle
    }
  },
  data: () => ({
    compute:
      {
        text: '',
        forum: ''
      },
    liveData:
      {
        devicesLive: [],
        datatypesLive: [],
        categoryLive: [],
        scienceLive: {},
        languageLive: {},
        timeLive: [],
        resolutionLive: ''
      },
    oc:
      {
        name: 'open'
      }
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    saveCompute () {
      console.log('save compute')
    },
    openCompute (oc) {
      oc.active = !oc.active
      if (oc.active === true) {
        oc.name = 'Close compute'
      } else {
        oc.name = 'Open compute'
      }
    }
  }
}
</script>

<style>
#compute-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#compute-nxp header{
  font-weight: bold;
}

#prime-compute {
  margin: 1em;
}

.compute-summary {
  display: inline-block;
}
</style>
