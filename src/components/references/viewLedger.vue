<template>
  <div id="cnrl-view"> LEDGER VIEWER
    <ul v-for="rd in ledgerData" :key="rd.id">
      <li class="ref-wrapper">
        <results-view>
          <template v-slot:header>
            <!-- The code below goes into the header slot -->
            index: {{ rd.key }}
          </template>
          <template v-slot:body>
            data: {{ rd.value }}
          </template>
        </results-view>
      </li>
    </ul>
  </div>
</template>

<script>
import ResultsView from './resultsViewer.vue'

export default {
  name: 'cnrlview-page',
  components: {
    ResultsView
  },
  props: {
    refTypeLive:
    {
      type: String
    }
  },
  data: () => ({
    viewerType: ''
  }),
  created () {
  },
  mounted () {
  },
  computed: {
    ledgerData: function () {
      return this.$store.state.peerKBLindex
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
