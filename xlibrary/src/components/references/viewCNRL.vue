<template>
  <div id="cnrl-view"> REFERENCE VIEWER
    <ul v-for="cd in referenceData" :key="cd">
      <li>
        <div class="cnrl-element"> <b> {{ cd.type }}--- </b></div>
        <div class="cnrl-element">{{ cd.title }} </div>
        <!-- <div class="cnrl-element"> {{ cd.history }}</div>
        <div class="cnrl-element"> {{ cd.wasmfile }}</div>
        <div class="cnrl-element">{{ cd.livingpaper }}</div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'cnrlview-page',
  components: {
  },
  props: {
    refTypeLive:
    {
      type: String
    }
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  computed: {
    referenceData: function () {
      console.log('ref')
      console.log(this.$store.state.referenceContract)
      return this.$store.state.referenceContract[this.refTypeLive]
    }
  },
  methods: {

  }
}
</script>

<style>
.cnrl-element {
  display: inline-block;
  margin-bottom: 1em;
}
</style>
