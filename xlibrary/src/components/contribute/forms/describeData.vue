<template>
  <div id="describe-data">
    <div class="row">
      <div class="col-3">
        <h3>Datatypes available</h3>
        <draggable class="list-group" :list="list1" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in list1"
            :key="element.name"
          >
          {{ element.name }}
          </div>
        </draggable>
      </div>
      <div id="data-columns">
        <div class="col-4">
          <h3>Data column</h3>
          <draggable class="list-group" :list="list2" group="people" @change="log">
            <div
              class="list-group-item"
              v-for="(element) in list2"
              :key="element.name"
            >
              {{ element.name }} {{ index }}
            </div>
          </draggable>
        </div>
        <div class="col-5">
          <h3>Data column</h3>
          <draggable class="list-group" :list="list3" group="people" @change="log">
            <div
              class="list-group-item"
              v-for="(element) in list3"
              :key="element.name"
            >
              {{ element.name }} {{ index }}
            </div>
          </draggable>
         </div>
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
  },
  data () {
    return {
      moduleNXP:
      {
        0: { prime: { type: 'nxp-question' } },
        1: { prime: { type: 'nxp-device' } },
        2: { prime: { type: 'nxp-dapp' } },
        3: { prime: { type: 'nxp-compute' } },
        4: { prime: { type: 'nxp-visualise' } },
        5: { prime: { type: 'nxp-education' } },
        6: { prime: { type: 'nxp-errormgt' } },
        7: { prime: { type: 'nxp-control' } },
        8: { prime: { type: 'nxp-lifestylemedicine' } },
        9: { prime: { type: 'nxp-prescription' } },
        10: { prime: { type: 'nxp-communication' } },
        11: { prime: { type: 'nxp-clone' } }
      },
      moduleList: ['Question', 'Device/source', 'Dapps', 'Compute', 'Visulisation'],
      list1: [
        { name: 'heart rate', id: 1 },
        { name: 'steps', id: 2 },
        { name: 'temperature', id: 3 },
        { name: 'humidity', id: 4 },
        { name: 'rainfall', id: 5 },
        { name: 'error mgt', id: 6 },
        { name: 'average', id: 7 },
        { name: 'air pressure', id: 8 },
        { name: 'p10', id: 9 },
        { name: 'p2.5', id: 10 }
      ],
      list2: [
      ],
      list3: [
      ]
    }
  },
  methods: {
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>

<style>
#module-builder {
}

.row {
  border: 3px solid green;
  min-height: 20em;
}

.col-3 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 15%;
  border: 2px solid grey;
  margin-right: 4em;
}

#data-columns {
  border: 2px solid red;
  display: inline-block;
  width: 60%;
}

.col-4 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 20%;
  border: 2px solid grey;
}

.col-5 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 20%;
  border: 2px solid grey;
}

.list-group {
  border: 1px solid red;
  min-height: inherit;
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
