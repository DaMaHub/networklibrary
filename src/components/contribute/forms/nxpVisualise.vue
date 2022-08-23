<template>
  <div id="visualise-nxp">
    <header>VISUALISE:</header>kbid {{ moduleCNRL }} vmdata {{ mData }}
    <div id="prime-visualise">
        <!-- <progress-Message :progressMessage="entityPrepareStatus"></progress-Message> -->
      <component v-bind:is="moduleVisType"></component>
    </div>
  </div>
</template>

<script>
import progressMessage from '@/components/toolbar/inProgress'
import chartBuilder from '@/components/visualise/chartBuilder'
import tableBuild from '@/components/visualise/table/tableBuilder'
import simulationView from '@/components/visualise/simulation/simulation-life'

export default {
  name: 'nxp-question',
  components: {
    progressMessage,
    chartBuilder,
    tableBuild,
    simulationView
  },
  props: {
    moduleCNRL: '',
    mData: {}
  },
  computed: {
    moduleVisType: function () {
      return 'chart-builder' // modvisType[this.dashCNRL].vistype
    }
  },
  data: () => ({
    visualise:
      {
        text: '',
        forum: ''
      },
    entityPrepareStatus:
      {
        active: false,
        text: 'Preparing visualisation'
      },
    visChart: false,
    visTableview: false,
    visSimview: false,
    vis1:
      {
        name: 'chart',
        id: 'vis-sc-1',
        active: false
      },
    vis2:
      {
        name: 'table',
        id: 'vis-sc-2',
        active: false
      },
    vis3:
      {
        name: 'simulation',
        id: 'vis-sc-3',
        active: false
      },
    tablecollection: {}
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    saveVisualise () {
      console.log('save visualise')
    },
    selectVis (visIN) {
      if (visIN.id === 'vis-sc-1') {
        if (visIN.active === true) {
          this.visChartview = false
          this.vis1.active = false
        } else {
          // dispatch and prepare bundleData
          this.$store.dispatch('actionBundleData', 'prepare')
          this.vis1.active = true
          this.visChartview = true
        }
      } else if (visIN.id === 'vis-sc-2') {
        if (visIN.active === true) {
          this.visTableview = false
          this.vis2.active = false
        } else {
          // dispatch and prepare bundleData
          this.$store.dispatch('actionBundleData', 'prepare')
          this.vis2.active = true
          this.visTableview = true
        }
      } else if (visIN.id === 'vis-sc-3') {
        if (visIN.active === true) {
          this.visSimview = false
          this.vis3.active = false
        } else {
          // dispatch and prepare bundleData
          this.$store.dispatch('actionBundleData', 'prepare')
          this.vis3.active = true
          this.visSimview = true
        }
      }
      // filter what visualisation is active
      this.filterVisualisation()
    },
    filterVisualisation () {
      const visLive = []
      if (this.vis1.active === true) {
        visLive.push(this.vis1.id)
      }
      if (this.vis2.active === true) {
        visLive.push(this.vis2.id)
      }
      if (this.vis3.active === true) {
        visLive.push(this.vis3.id)
      }
    },
    addToExperiment (exB) {
      this.selectedExperiment = exB.target.value
    },
    experADD (expA) {
      // need to keep permanent store of experiments to Ecomponents linked (save, delete, update also)
      const localthis = this
      this.$emit('experimentMap', this.selectedExperiment)
      setTimeout(function () {
        localthis.saveExpKid.active = false
      }, 3000) // hide the message after 3 seconds
    }
  }
}
</script>

<style>
#visualise-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#visualise-nxp header{
  font-weight: bold;
}

#prime-visualise {
  margin: 1em;
}

.visualisation-type {
  display: inline-block;
}
</style>
