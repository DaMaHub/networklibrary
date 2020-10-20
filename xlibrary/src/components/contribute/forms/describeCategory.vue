<template>
  <div id="describe-category">
    Category
    <label for="package-add-category">Select datatype:</label>
    <select class="select-categor-id" id="category-mapping-build" @change="categoryDTSelect" v-model="catForm.category">
      <option value="none" selected="">Please select</option>
      <option v-for="dtl in datatypesLive" :key="dtl.key" v-bind:value="dtl.key">
        <option value=dtl.key>{{ dtl.value.concept.name }}</option>
      </option>
    </select>
    <label for="package-add-category">Select column:</label>
    <select class="select-categor-id" id="category-mapping-build" @change="categorycolumnSelect" v-model="catForm.categorycolumn">
      <option value="none" selected="">Select column</option>
      <option v-for="dtl in datatypesLive" :key="dtl.key" v-bind:value="dtl.key">
        <option value=dtl.key>{{ dtl.value.concept.name }}</option>
      </option>
    </select>
    <label for="add-category-rule">Rule/code:</label>
    <input type="text"  id="mapping-rule-code" placeholder="" required @change="categoryruleSave" @paste="categoryruleSave" @keyup="categoryruleSave" v-model="catForm.categoryrule" />
  </div>
</template>

<script>

export default {
  name: 'describe-category',
  components: {
  },
  props: {
    catID: null,
    catForm: {
      type: Object
    }
  },
  computed: {
    datatypesLive: function () {
      return this.$store.state.referenceContract.datatype
    },
    categoryLive: function () {
      return this.$store.state.newPackingForm.category
    }
  },
  data: () => ({
  }),
  methods: {
    categoryDTSelect () {
      this.$store.dispatch('buildRefPackageCategory', this.catForm.category)
    },
    categorycolumnSelect () {
      this.$store.dispatch('buildRefPackageCategoryColumn', this.catForm.categorycolumn)
    },
    categoryruleSave () {
      this.$store.dispatch('buildRefPackageCategoryRule', this.catForm.categoryrule)
    }
  }
}
</script>

<style>
#describe-category {
  margin: 1.2em;
}
</style>
