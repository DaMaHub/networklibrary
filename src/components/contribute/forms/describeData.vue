<template>
  <div id="describe-data">
    <div class="row">
      <div class="col-3">
        <h3>Datatypes available</h3>
        <draggable class="list-group" :list="list1" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in list1"
            :key="element.key"
          >
            {{ element.value.concept.name }}
          </div>
        </draggable>
      </div>
      <div id="data-columns">
        <header>Drag datatype to column name</header>
        <ul v-for='col in dtcolumns' :key='col.id'>
          <div class="col-name">
            <h3>{{ col.name }}</h3>
            <draggable class="list-group" :list="newLists[col.count]" group="people" @change="log">
              <div
                class="list-match-item"
                v-for="(element) in newLists[col.count]"
                :key="element.key"
              >
                {{ element.value.concept.name }}
              </div>
            </draggable>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'describe-data',
  components: {
    draggable
  },
  props: {
  },
  computed: {
    list1: function () {
      return this.$store.state.dataTypesLive
    },
    dtcolumns: function () {
      return this.$store.state.newPackingForm.apicolumns
    },
    newLists: function () {
      return this.$store.state.newPackingForm.apicolHolder
    }
  },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    log: function (evt) {
      // window.console.log(evt)
    }
  }
}
</script>

<style>
#module-builder {
}

.row {
  border: 3px solid lightgrey;
  min-height: 2em;
}

.col-3 {
  display: inline-block;
  vertical-align: text-top;
  width: 25%;
  border: 2px solid grey;
  margin-right: 4em;
}

.col-name {
  display: inline-block;
  vertical-align: text-top;
  width: 60%;
  border: 1px solid grey;
}

#data-columns {
  border: 2px solid orange;
  min-height: 400px;
  vertical-align: text-top;
  display: inline-block;
  width: 40%;
}

.list-group {
  border: 1px solid lightgrey;
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

.list-match-item {
  display: block;
  width: 200px;
  padding: .5em;
  margin: 1em;
  border: 1px solid lightgrey;
  background-color: #E6ECEC;
}
</style>
