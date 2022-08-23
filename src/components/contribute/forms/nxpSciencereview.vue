<template>
  <div id="sciencereview-nxp">
    <header>Science review:</header>
    <div id="prime-sciencereview">
      <form id="sciencereview_form" name="sciencereview_form" method="post" action="#">
        <ul>
          <li class="sciencereview-summary">
            Prime sciencereview:<input v-model="sciencereview.text" placeholder="prime">
          </li>
          <li class="sciencereview-summary">
            Github discussion:<input v-model="sciencereview.forum" placeholder="git link">
          </li>
          <li class="sciencereview-summary">
            <button @click.prevent="savesciencereview($event)">Save sciencereview</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nxp-sciencereview',
  components: {
  },
  data: () => ({
    sciencereview:
      {
        text: '',
        forum: ''
      }
  }),
  created () {
  },
  mounted () {
  },
  sciencereviewd: {
  },
  methods: {
    savesciencereview () {
      console.log('save sciencereview')
    }
  }
}
</script>

<style>
#sciencereview-nxp {
  margin: 1em;
  border: 1px solid grey;
}

#sciencereview-nxp header{
  font-weight: bold;
}

#prime-sciencereview {
  margin: 1em;
}

.sciencereview-summary {
  display: inline-block;
}
</style>
