<template>
  <div id="newapi-view">
    <div class="api-form-item">
      <span class="required_notification">All fields required</span>
    </div>
    <div class="api-form-item">
      <label for="api-datatype-source">Datatype Primary?</label>
      <select class="select-datatype-source" id="source-value" v-model="formData.primary" @input="primarySelect" @paste="primarySelect" @change="primarySelect">Please select
        <option value="yes">YES</option>
        <option value="no">NO</option>
      </select>
    </div>
    <div v-if="formData.primary==='yes'" id="new-primary-datatype">
      <div class="api-form-item">
        <label for="api-add-name">Name:</label>
        <input id="ref-datatype-name" @input="nameSave" @paste="nameSave" @keyup="nameSave" v-model="formData.name" placeholder="datatype name" required="" type="text">
      </div>
      <div class="api-form-item">
        <label for="datatype-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" @input="descriptionSave" @paste="descriptionSave" @keyup="descriptionSave" v-model="formData.description" required="" id="api-datatype-description"></textarea>
      </div>
      <div class="api-form-item">
        <label for="rdf-add-description">Wikipedia entry:</label>
        <input id="wikipedia-datatype-name" @input="wikiSave" @paste="wikiSave" @keyup="wikiSave" v-model="formData.wiki" placeholder="wikipedia link" required="" type="text">
      </div>
      <div class="api-form-item">
        <label for="rdf-add-description">RDF linked data:</label>
        <input id="rdf-datatype-name" @input="rdfSave" @paste="rdfSave" @keyup="rdfSave" v-model="formData.rdf" placeholder="rdf link" required="" type="text">
      </div>
    </div>
    <div v-if="formData.primary==='no'" id="build-existing-datatypes">
      List or drag and drop from existing DT's  e.g. average BPM  is average DT +  BMP DT
    </div>
    <div class="api-form-item">
      <label for="measurement-add-description">Measurement:</label>
      <input id="measurement-datatype-name" @input="measurementSave" @paste="measurementSave" @keyup="measurementSave" v-model="formData.measurement" placeholder="measurement units" required="" type="text">
    </div>
    <div class="api-form-item">
      <label for="type-structure">Type</label>
      <select class="select-type-structure" id="type-value" v-model="formData.datatypeType" @paste="typeSelect" @change="typeSelect">Please select
        <option value="integer">Integer</option>
        <option value="float">float</option>
        <option value="boolean">True/False</option>
        <option value="string">String</option>
        <option value="array">Array</option>
        <option value="object">Object</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'package-form',
  components: {
  },
  computed: {
    liveForm: function () {
      return this.$store.state.newRefcontractForm
    }
  },
  props: {
    formData: {
      type: Object
    }
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    primarySelect () {
      console.log(this.formData.primary)
      this.$store.dispatch('buildRefcontractPrimary', this.formData.primary)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefContractName', this.formData.name)
      return true
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefContractDescription', this.formData.description)
      return true
    },
    wikiSave (k) {
      this.$store.dispatch('buildRefContractWiki', this.formData.wiki)
      return true
    },
    rdfSave (k) {
      this.$store.dispatch('buildRefContractRDF', this.formData.rdf)
      return true
    },
    typeSelect () {
      this.$store.dispatch('buildRefcontractType', this.formData.datatypeType)
    },
    measurementSave () {
      this.$store.dispatch('buildRefcontractMeasurement', this.formData.measurement)
    }
  }
}
</script>

<style scoped>
#wikipedia-datatype-name {
  width: 300px;
}

#newapi-view {
  display: grid;
  grid-template-columns: 1fr;
}

.api-form-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-top: .5em;
}

.api-form-item label {
  border: 0px solid red;
  margin-right: 1em;
  justify-self: end;
}

#new-primary-datatype {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
