<template>
  <div id="describe-tidy">
    <label for="jack">Tidy</label>
    <input type="checkbox" id="tidy" value="tidy" @change="tidySelect" v-model="packaging.tidy">
    <label for="tidy-add-category">Select datatype:</label>
    <select class="select-tidy-id" id="tidy-mapping-build" @change="tidyDTSelect" v-model="packaging.tidydatatype">
      <option value="none" selected="">Please select</option>
      <option v-for="dtl in datatypesLive" :key="dtl.key" >
        <option value=dtl.key>{{ dtl.value.concept.name }}</option>
      </option>
    </select>
    <label for="add-category-rule">Tidy code:</label>
    <input type="text"  id="mapping-rule-code" placeholder="" required @change="tidycodeSave" @paste="tidycodeSave" @keyup="tidycodeSave" v-model="packaging.tidycode"/>
  </div>
</template>

<script>

export default {
  name: 'describe-tidy',
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
    tidySelect () {
      console.log('cat yes no')
    },
    tidyDTSelect () {
      console.log('cat dt rule')
    },
    tidycodeSave () {
      console.log('tidy code')
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
