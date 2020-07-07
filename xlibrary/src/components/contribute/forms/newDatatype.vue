<template>
  <div id="newapi-view">
    <ul>
      <li class="api-form-item"> {{ this.newDataType.primary }}
        <span class="required_notification">All fields required</span>
      </li>
      <li class="api-form-item">
        <label for="api-datatype-source">Datatype Primary?</label>
        <select class="select-datatype-source" id="source-value" v-model="newDataType.primary" @paste="primarySelect" @change="primarySelect">Please select
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </li>
      <div v-if="newDataType.primary==='yes'" id="new-primary-datatype">
        <li class="api-form-item">
          <label for="api-add-name">Name:</label>
          <input id="ref-datatype-name" @paste="nameSave" @keyup="nameSave" v-model="newDataType.name" placeholder="datatype name" required="" type="text">
        </li>
        <li class="api-form-item">
          <label for="datatype-add-description">Description:</label>
          <textarea name="message" cols="40" rows="6" @paste="descriptionSave" @keyup="descriptionSave" v-model="newDataType.description" required="" id="api-datatype-description"></textarea>
        </li>
        <li class="wikipedia-form-item">
          <label for="rdf-add-description">Wikipedia entry:</label>
          <input id="wikipedia-datatype-name" @paste="wikiSave" @keyup="wikiSave" v-model="newDataType.wiki" placeholder="wikipedia link" required="" type="text">
        </li>
        <li class="rdf-form-item">
          <label for="rdf-add-description">RDF linked data:</label>
          <input id="rdf-datatype-name" @paste="rdfSave" @keyup="rdfSave" v-model="newDataType.rdf" placeholder="rdf link" required="" type="text">
        </li>
      </div>
      <div v-if="newDataType.primary==='no'" id="build-existing-datatypes">
        List or drag and drop from existing DT's  e.g. average BPM  is average DT +  BMP DT
      </div>
      <li class="measurement-form-item">
        <label for="measurement-add-description">Measurement:</label>
        <input id="measurement-datatype-name" @paste="measurementSave" @keyup="measurementSave" v-model="newDataType.measurement" placeholder="measurement units" required="" type="text">
      </li>
      <li class="type-form-item">
        <label for="type-structure">Type</label>
        <select class="select-type-structure" id="type-value" v-model="datatypeType" @paste="typeSelect" @change="typeSelect">Please select
          <option value="integer">Integer</option>
          <option value="float">float</option>
          <option value="boolean">True/False</option>
          <option value="string">String</option>
          <option value="array">Array</option>
          <option value="object">Object</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'package-form',
  components: {
  },
  data: () => ({
    datatypeType: null,
    newDataType:
    {
      primary: '',
      name: '',
      description: ''
    }
  }),
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    primarySelect () {
      console.log(this.newDataType.primary)
      this.$store.dispatch('buildRefcontractPrimary', this.newDataType.primary)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefContractName', this.newDataType.name)
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefContractDescription', this.newDataType.description)
    },
    wikiSave (k) {
      this.$store.dispatch('buildRefContractWiki', this.newDataType.wiki)
    },
    rdfSave (k) {
      this.$store.dispatch('buildRefContractRDF', this.newDataType.rdf)
    },
    typeSelect () {
      this.$store.dispatch('buildRefcontractType', this.datatypeType)
    },
    measurementSave () {
      this.$store.dispatch('buildRefcontractMeasurement', this.newDataType.measurement)
    }
  }
}
</script>

<style>
#wikipedia-datatype-name {
  width: 300px;
}
</style>
