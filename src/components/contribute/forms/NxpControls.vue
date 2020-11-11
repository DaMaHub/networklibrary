<template>
  <div id="nxp-toolbar">Controls over NXPs
    <div id="nxp-master-toolbar"> dd {{ liveexerimentList }}
      <select class="button-expadd" href="" id="add-exp-button" v-model="nxpSelect"  @change="selectNXP()">
        <option class="science-nxp" v-for="expi in liveexerimentList" v-bind:value="expi.prime.cnrl">
         {{ expi.prime.text }}
        </option>
      </select>
      <div class="control-buttons" id="new-button">
        <button v-model="newNXP" class="button-new-nxp" href="" id="new-exp-button" @click.prevent="nxpNew($event)">New</button>
      </div>
      <div class="control-buttons">
        <button v-model="viewCNRL" class="button-view-cnrl" href="" id="cnrl-view-button" @click.prevent="viewCNRLlibrary(viewCNRL)">{{ viewCNRL.name }}</button>
      </div>
      <div class="control-buttons">
        <button v-model="computehist" class="button-view-computelist" href="" id="computelist-view-button" @click.prevent="viewComputeHistory(computehist)">{{ computehist.name }}</button>
      </div>
      <cnrl-controls v-if="viewCNRL.active" class="control-buttons"></cnrl-controls>
      <div id="history" v-if="computehist.active">
        <history-List class="control-buttons"></history-List>
      </div>
      <div id="live-learn" class="control-buttons">
        <div id="live-learn-container">
          <div id="learn">
            <button class="" href="" id="learn-button" @click.prevent="filterLearn(learn)">{{ learn.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cnrlControls from '../cnrl/cnrlControls.vue'
import historyList from '@/components/healthscience/historyList.vue'

export default {
  name: 'nxp-controls',
  components: {
    cnrlControls,
    historyList
  },
  computed: {
    liveexerimentList: function () {
      return this.$store.state.experimentList
    }
  },
  data () {
    return {
      nxpSelect: '',
      learn:
        {
          name: 'learn',
          id: 'learn-status'
        },
      saveExpKid:
        {
          active: false,
          text: ''
        },
      newNXP:
        {
          active: false,
          text: 'NXP'
        },
      viewCNRL:
        {
          active: false,
          name: 'view CNRL'
        },
      CNRLdata: [],
      computehist:
        {
          name: 'View compute list',
          id: 'learn-history',
          active: false
        }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    selectNXP (exB) {
      // dispatch select to store
      console.log('select NXP')
      console.log(this.nxpSelect)
      // this.$store.dispatch('actionSetNXP', this.nxpSelect)
      this.$store.dispatch('actionDashboardState', this.nxpSelect)
    },
    nxpNew () {
      console.log('set up new NXP')
      this.$store.dispatch('actionNewNXP', true)
      this.$store.dispatch('actionSetNXP', true)
    },
    viewCNRLlibrary (cnrlv) {
      cnrlv.active = !cnrlv.active
      if (cnrlv.active === true) {
        this.viewCNRL.name = 'Close CNRL'
      } else {
        this.viewCNRL.name = 'View CNRL'
      }
    },
    viewComputeHistory (hist) {
      hist.active = !hist.active
      if (hist.active === true) {
        this.computehist.name = 'Close compute list'
      } else {
        this.computehist.name = 'View compute list'
      }
      this.$emit('viewHistory', hist)
    }
  }
}
</script>

<style>
.control-buttons {
  display: inline-block;
}

#learn-button {
  font-size: 1.6em;
  padding: .25em;

}

</style>
