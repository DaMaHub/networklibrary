<template>
  <div id="control-nxp">
    <header>Control study:</header>
    <div id="prime-control">
      <form id="control_form" name="control_form" method="post" action="#">
        <ul>
          <li class="control-summary">
            Prime control:<input v-model="control.text" placeholder="prime">
          </li>
          <li class="control-summary">
            Github discussion:<input v-model="control.forum" placeholder="git link">
          </li>
          <li class="control-summary">
            <button @click.prevent="savecontrol($event)">Save control</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-control',
  components: {
  },
  data: () => ({
    control:
      {
        text: '',
        forum: ''
      }
  }),
  created () {
  },
  mounted () {
  },
  controld: {
  },
  methods: {
    savecontrol () {
      console.log('save control')
    }
  }
}
</script>

<style>
#control-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#control-nxp header{
  font-weight: bold;
}

#prime-control {
  margin: 1em;
}

.control-summary {
  display: inline-block;
}
</style>
