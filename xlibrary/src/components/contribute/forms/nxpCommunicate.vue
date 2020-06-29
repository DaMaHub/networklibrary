<template>
  <div id="communicate-nxp">
    <header>COMMUNICATE:</header>
    <div id="prime-communicate">
      <textarea rows="4" cols="50">
        <iframe width="560" height="315" src="safe://embed/E56PSzFcW8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; nxp-in-nxp" allowfullscreen></iframe>
      </textarea>
      <button>share NXP</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-communicate',
  components: {
  },
  data: () => ({
    communicate:
      {
        text: '',
        forum: ''
      }
  }),
  created () {
  },
  mounted () {
  },
  communicated: {
  },
  methods: {
    saveCommunicate () {
      console.log('save communicate')
    }
  }
}
</script>

<style>
#communicate-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#communicate-nxp header{
  font-weight: bold;
}

#prime-communicate {
  margin: 1em;
}
</style>
