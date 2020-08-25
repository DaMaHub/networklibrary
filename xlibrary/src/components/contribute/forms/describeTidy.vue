<template>
  <div id="describe-tidy"> tidy---{{ tidyForm }} live == {{ tidyLive }}
    <label for="tidy">Tidy</label>
    <input type="checkbox" id="tidy" value="tidy" @change="tidySelect" v-model="tidyForm.tidy">
    <label for="tidy-add-category">Select datatype:</label>
    <select class="select-tidy-id" id="tidy-mapping-build" @change="tidyDTSelect" v-model="tidyForm.tidydatatype">
      <option value="none" selected="">Please select</option>
      <option v-for="dtl in datatypesLive" :key="dtl.key" >
        <option value=dtl.key>{{ dtl.value.concept.name }}</option>
      </option>
    </select>
    <label for="add-category-rule">Tidy code:</label>
    <input type="text"  id="mapping-rule-code" placeholder="" required @change="tidycodeSave" @paste="tidycodeSave" @keyup="tidycodeSave" v-model="tidyForm.tidycode"/>
  </div>
</template>

<script>

export default {
  name: 'describe-tidy',
  components: {
  },
  props: {
    tidyForm: {
      type: Object
    }
  },
  computed: {
    datatypesLive: function () {
      return this.$store.state.referenceContract.datatype
    },
    tidyLive: function () {
      return this.$store.state.newPackingForm.tidy
    }
  },
  data: () => ({
  }),
  methods: {
    tidySelect () {
      console.log('cat yes no')
      this.$store.dispatch('buildRefPackageTidy', this.tidyForm.tidy)
    },
    tidyDTSelect () {
      console.log('cat dt rule')
      this.$store.dispatch('buildRefPackageTidyDT', this.tidyForm.tidydatatype)
    },
    tidycodeSave () {
      console.log('tidy code')
      this.$store.dispatch('buildRefPackageTidycode', this.tidyForm.tidycode)
    }
  }
}
</script>

<style>
#describe-tidy {
  margin: 1.2em;
}
</style>
