<template>
  <div id="newvisualise-view">
    <ul>
      <li class="visualise-form-item">-- {{ newVisRefContract }}
        <span class="required_notification">All fields required</span>
      </li>
      <li class="visualise-form-item">
        <label for="visualise-add-source">Source Primary?</label>
        <select class="select-package-source" id="v-primary" @change="primarySelect" v-model="visualise.primary">Please select
          <option value=true>YES</option>
          <option value=false>NO</option>
        </select>
      </li>
      <li class="visualise-form-item">
        <label for="visualise-add-name">Name:</label>
        <input id="visualise-mapping-name" @paste="nameSave" @keyup="nameSave" v-model="visualise.name" placeholder="visualise mapping name" required="" type="text">
      </li>
      <li class="visualise-form-item">
        <label for="visualise-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" required="" id="visualise-mapping-description" @paste="descriptionSave" @keyup="descriptionSave" v-model="visualise.description"></textarea>
      </li>
      <li class="visualise-form-item">
        <h2>Data Structure</h2>
        <label for="visualise-structure-types">Structure name</label>
        <input id="visualise-mapping-name" @paste="structureSave" @keyup="structureSave" v-model="visualise.structure.name" placeholder="visualise structure name" required="" type="text">
        <!-- <a href="#" @click.prevent="addLabel" >add label</a> @change="labelAddinput" -->
        <div id="new-structure-lab">
          <ul v-for="(dl, index) of structElement" :key='dl.id'>
            <li>
              <input id="structure-label-name"  v-model="structElement[index].labels" placeholder="" required="" type="text">
              <label for="structure-add-element">Data holder</label>
              <select class="select-structure-source" id="v-primary" @change="typeESelect(index)" v-model="structElement[index].type">Please select type
                <option value=null>null</option>
                <option value=Array>Array</option>
                <option value=Object>Object</option>
              </select>
            </li>
          </ul>
          <a href="#" @click.prevent="addElement" >add element</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'visualise-form',
  components: {
  },
  computed: {
    newVisRefContract: function () {
      console.log('new contract in making???')
      console.log(this.$store.state.newVisualiseForm)
      return this.$store.state.newVisualiseForm
    }
  },
  data: () => ({
    visualise:
    {
      primary: null,
      name: '',
      description: '',
      structure: {},
      elements: []
    },
    structElement: [],
    index: 0
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    primarySelect () {
      this.$store.dispatch('buildVisualisePrimary', this.visualise.primary)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefVisualiseName', this.visualise.name)
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefVisualiseDescription', this.visualise.description)
    },
    structureSave () {
      this.$store.dispatch('buildRefVisualiseStructure', this.visualise.structure.name)
    },
    structureElementSave () {
      console.log('structure element save')
      // this.$store.dispatch('buildRefVisualiseStructureElement', this.visualise.structure)
    },
    labelAddinput () {
      this.$store.dispatch('buildRefVisualiseStructureElementLabel', this.visualise.elements.label)
    },
    typeESelect (index) {
      console.log('structure element save')
      console.log(index)
      this.$store.dispatch('buildRefVisualiseStructureElementType', this.structElement[index])
    },
    addLabel () {
      console.log('add structure label')
      // this.structLabel.push({ label: 0 })
    },
    addElement () {
      console.log('add structure label')
      this.structElement.push({})
    }
  }
}
</script>

<style>
.visualise-form-item {
  margin: 1em;
  list-style: none;
}
</style>
