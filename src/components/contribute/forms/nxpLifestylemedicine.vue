<template>
  <div id="lifestylemedicine-nxp">
    <header>Lifestyle & Functional medicine:</header>
    <div id="prime-lifestylemedicine">
      <form id="lifestylemedicine_form" name="lifestylemedicine_form" method="post" action="#">
        <ul>
          <li class="lifestylemedicine-summary">
            Prime lifestylemedicine:<input v-model="lifestylemedicine.text" placeholder="prime">
          </li>
          <li class="lifestylemedicine-summary">
            Github discussion:<input v-model="lifestylemedicine.forum" placeholder="git link">
          </li>
          <li class="lifestylemedicine-summary">
            <button @click.prevent="savelifestylemedicine($event)">Save lifestylemedicine</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-lifestylemedicine',
  components: {
  },
  data: () => ({
    lifestylemedicine:
      {
        text: '',
        forum: ''
      }
  }),
  created () {
  },
  mounted () {
  },
  lifestylemedicined: {
  },
  methods: {
    savelifestylemedicine () {
      console.log('save lifestylemedicine')
    }
  }
}
</script>

<style>
#lifestylemedicine-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#lifestylemedicine-nxp header{
  font-weight: bold;
}

#prime-lifestylemedicine {
  margin: 1em;
}

.lifestylemedicine-summary {
  display: inline-block;
}
</style>
