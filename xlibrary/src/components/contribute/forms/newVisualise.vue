<template>
  <div id="newvisualise-view">
    <ul>
      <li class="visualise-form-item">
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
        <!-- <a href="#" @click.prevent="addLabel" >add label</a> -->
        <div id="new-structure-lab"> vis== {{ visualise.elements }}
          <ul v-for="(dl, index) of structElement" :key='dl.id'>
            <li> {{ dl }}=={{ index }}
              <input id="structure-label-name" @change="labelAddinput" v-model="visualise.elements.label" placeholder="element" required="" type="text">
              <label for="structure-add-element">Element</label>
              <select class="select-structure-source" id="v-primary" @change="typeESelect" v-model="visualise.elements.type[index]">Please select type
                <option value=array>Array</option>
                <option value=object>Object</option>
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
  data: () => ({
    visualise:
    {
      primary: null,
      name: '',
      description: '',
      structure: {},
      elements:
      {
        labels: {},
        type: {}
      }
    },
    structElement: [],
    index: 0
  }),
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    primarySelect () {
      this.$store.dispatch('buildVisualisePrimary', this.visualise.prime)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefVisualiseName', this.visualise.name)
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefVisualiseDescription', this.visualise.description)
    },
    structureSave () {
      console.log('structure save')
      this.$store.dispatch('buildRefVisualiseStructure', this.visualise.structure)
    },
    structureElementSave () {
      console.log('structure element save')
      this.$store.dispatch('buildRefVisualiseStructureElement', this.visualise.structure)
    },
    labelAddinput () {
      console.log('structure element save')
      this.$store.dispatch('buildRefVisualiseStructureElementLabel', this.visualise.elements.label)
    },
    typeESelect () {
      console.log('structure element save')
      this.$store.dispatch('buildRefVisualiseStructureElementType', this.visualise.elements.type)
    },
    addLabel () {
      console.log('add structure label')
      this.structLabel.push({ label: 0 })
    },
    addElement () {
      console.log('add structure label')
      this.structElement.push({ element: 0 })
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
