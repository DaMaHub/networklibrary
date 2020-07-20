<template>
  <div id="describe-category">
    Category
    <label for="package-add-category">Select datatype:</label>
    <select class="select-categor-id" id="category-mapping-build" @change="categoryDTSelect" v-model="packaging.category">
      <option value="none" selected="">Please select</option>
      <option v-for="dtl in datatypesLive" :key="dtl.key" >
        <option value=dtl.key>{{ dtl.value.concept.name }}</option>
      </option>
    </select>
    <label for="package-add-category">Select column:</label>
    <select class="select-categor-id" id="category-mapping-build" @change="categorycolumnSelect" v-model="packaging.categorycolumn">
      <option value="none" selected="">Select column</option>
      <option v-for="dtl in datatypesLive" :key="dtl.key" >
        <option value=dtl.key>{{ dtl.value.concept.name }}</option>
      </option>
    </select>
    <label for="add-category-rule">Rule/code:</label>
    <input type="text"  id="mapping-rule-code" placeholder="" required @change="categoryruleSave" @paste="categoryruleSave" @keyup="categoryruleSave" v-model="packaging.categoryrule"/>
  </div>
</template>

<script>

export default {
  name: 'describe-category',
  components: {
  },
  props: {
  },
  computed: {
    datatypesLive: function () {
      return this.$store.state.referenceContract.datatype
    }
  },
  data: () => ({
    packaging:
    {
      primary: null,
      name: '',
      description: '',
      api: '',
      baseaddress: '',
      apipath: ''
    }
  }),
  methods: {
    categorySave (ak) {
      // console.log(ak)
      // console.log(this.packaging.category)
      // this.$store.dispatch('buildRefPackageCategory', this.packaging.category)
    },
    categoryDTSelect () {
      console.log('sele cat')
    },
    categorycolumnSelect () {
      console.log('cat col')
    },
    categoryruleSave () {
      console.log('cat rule')
    }
  }
}
</script>

<style>
#module-builder {
}

.row {
  border: 3px solid green;
  min-height: 2em;
}

.col-3 {
  display: inline-block;
  vertical-align: text-top;
  width: 15%;
  border: 2px solid grey;
  margin-right: 4em;
}

.col-name {
  display: inline-block;
  vertical-align: text-top;
  width: 20%;
  border: 2px solid grey;
}

#data-columns {
  border: 4px solid red;
  vertical-align: text-top;
  display: inline-block;
  width: 40%;
}

.list-group {
  border: 1px solid red;
  background-color: white;
  min-height: 4em;
}

.list-group-item {
  display: block;
  width: 80%;
  padding: .5em;
  margin: 1em;
  border: 1px solid lightgrey;
  background-color: #E6ECEC;
}
</style>
