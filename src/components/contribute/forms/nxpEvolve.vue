<template>
  <div id="evolve-nxp">
    <header>EVOLVE:</header>
    <div id="prime-evolve">
      Question, Resolution of Data, New Compute, New Data sources
      <button>Evolve</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-evolve',
  components: {
  },
  data: () => ({
    evolve:
      {
        text: '',
        forum: ''
      }
  }),
  created () {
  },
  mounted () {
  },
  evolved: {
  },
  methods: {
    saveeEvolve () {
      console.log('save evolve')
    }
  }
}
</script>

<style>
#evolve-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#evolve-nxp header{
  font-weight: bold;
}

#prime-evolve {
  margin: 1em;
}
</style>
