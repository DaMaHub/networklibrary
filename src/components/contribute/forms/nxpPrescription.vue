<template>
  <div id="prescription-nxp">
    <header>Prescription medicine:</header>
    <div id="prime-prescription">
      <form id="prescription_form" name="prescription_form" method="post" action="#">
        <ul>
          <li class="prescription-summary">
            Prime prescription:<input v-model="prescription.text" placeholder="prime">
          </li>
          <li class="prescription-summary">
            Github discussion:<input v-model="prescription.forum" placeholder="git link">
          </li>
          <li class="prescription-summary">
            <button @click.prevent="saveprescription($event)">Save prescription</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-prescription',
  components: {
  },
  data: () => ({
    prescription:
      {
        text: '',
        forum: ''
      }
  }),
  created () {
  },
  mounted () {
  },
  prescriptiond: {
  },
  methods: {
    saveprescription () {
      console.log('save prescription')
    }
  }
}
</script>

<style>
#prescription-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#prescription-nxp header{
  font-weight: bold;
}

#prime-prescription {
  margin: 1em;
}

.prescription-summary {
  display: inline-block;
}
</style>
