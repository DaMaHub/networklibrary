<template>
  <div id="cnrl-view"> REFERENCE VIEWER -- {{ refTypeLive }}
    <ul v-for="cd in referenceData" :key="cd.title">
      <li>
        <div class="cnrl-element"> <b> {{ cd.concept }}--- </b></div>
        <div class="cnrl-element">{{ cd.space }} </div>
        <div class="cnrl-element">{{ cd.computational }} </div>
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
      console.log(this.$store.state.referenceContract[this.refTypeLive])
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
