<template>
  <div id="newvisualise-view">
    <div class="visualise-form-item">
      <span class="required_notification">All fields required</span>
    </div>
    <div class="visualise-form-item">
      <label for="visualise-add-source">Source Primary?</label>
      <select class="select-package-source" id="v-primary" @input="primarySelect" @change="primarySelect" v-model="formData.primary">Please select
        <option value=true>YES</option>
        <option value=false>NO</option>
      </select>
    </div>
    <div class="visualise-form-item">
      <label for="visualise-add-name">Name:</label>
      <input id="visualise-mapping-name" @input="nameSave" @paste="nameSave" @keyup="nameSave" v-model="formData.name" placeholder="visualise mapping name" required="" type="text">
    </div>
    <div class="visualise-form-item">
      <label for="visualise-add-description">Description:</label>
      <textarea name="message" cols="40" rows="6" required="" id="visualise-mapping-description" @input="descriptionSave" @paste="descriptionSave" @keyup="descriptionSave" v-model="formData.description"></textarea>
    </div>
    <div class="visualise-form-item">
      <label for="visualise-structure-types">Structure name</label>
      <input id="visualise-mapping-name" @input="structureSave" @paste="structureSave" @keyup="structureSave" v-model="formData.structureName" placeholder="visualise structure name" required="" type="text">
    </div>
    <div id="visualise-form-item">
      <ul class="lab-list" v-for="(dl, index) of formData.visHolder" :key='dl.id'>
        <div class="lab-item">
          <input id="structure-label-name"  v-model="formData.visHolder[index].labels" placeholder="" required="" type="text">
          <label for="structure-add-element">Data holder</label>
          <select class="select-structure-source" id="v-primary" @change="typeESelect(index)" v-model="formData.visHolder[index].type">Please select type
            <option value=null>null</option>
            <option value=Array>Array</option>
            <option value=Object>Object</option>
          </select>
        </div>
      </ul>
      <a href="#" @click.prevent="addElement" >add element</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'visualise-form',
  components: {
  },
  computed: {
    newVisRefContract: function () {
      return this.$store.state.newVisualiseForm
    }
  },
  props: {
    formData: {
      type: Object
    }
  },
  data: () => ({
    index: 0
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    primarySelect () {
      this.$store.dispatch('buildVisualisePrimary', this.formData.primary)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefVisualiseName', this.formData.name)
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefVisualiseDescription', this.formData.description)
    },
    structureSave () {
      this.$store.dispatch('buildRefVisualiseStructure', this.formData.structureName)
    },
    typeESelect (index) {
      this.$store.dispatch('buildRefVisualiseStructureElementType', this.formData.visHolder[index])
    },
    addElement () {
      this.formData.visHolder.push({})
    }
  }
}
</script>

<style scoped>
#newvisualise-view {
  display: grid;
  grid-template-columns: 1fr;
}

.visualise-form-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-top: .5em;
}

.visualise-form-item label {
  border: 0px solid red;
  margin-right: 1em;
  justify-self: end;
}

#new-structure-lab {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.lab-item {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  margin-top: 2em;
}
</style>
