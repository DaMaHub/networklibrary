<template>
  <div id="compute-form-view">
    <div class="compute-form-item">
      <span class="required_notification">All fields required</span>
    </div>
    <div class="compute-form-item">
      <label for="compute-add-name">Name:</label>
      <input id="compute-mapping-name" @input="nameSave" @paste="nameSave" @keyup="nameSave" v-model="formData.name" placeholder="compute mapping name" required="" type="text">
    </div>
    <div class="compute-form-item">
      <label for="compute-add-description">Description:</label>
      <textarea name="message" cols="40" rows="6" @input="descSave" @paste="descSave" @keyup="descSave" v-model="formData.description" required="" id="compute-mapping-description"></textarea>
    </div>
    <div class="compute-form-item">
      <label for="compute-add-source">Compute Primary?</label>
      <select class="select-compute-source" @change="primarySave" v-model="formData.primary" id="">Please select
        <option value="yes">YES</option>
        <option value="no">NO</option>
      </select>
    </div>
    <div class="compute-form-item">
      <label for="compute-add-datatype">datatype prefix:</label>
      <input id="compute-refcontract-dt" placeholder="datatype ref contract" @input="dtprefixSave" @paste="dtprefixSave" @keyup="dtprefixSave" v-model="formData.dtprefiex" required="" type="text">
    </div>
    <div class="compute-form-item">
      <label for="compute-add-name">location of code:</label>
      <input id="compute-code-name" placeholder="compute code" @input="codeSave" @paste="codeSave" @keyup="codeSave" v-model="formData.code" required="" type="text">
    </div>
    <div class="compute-form-item">
      <label for="compute-add-hash">hash of code:</label>
      <input id="compute-code-hash" placeholder="compute hash" @input="hashSave" @paste="hashSave" @keyup="hashSave" v-model="formData.hash" required="" type="text">
    </div>
  </div>
</template>

<script>
export default {
  name: 'compute-form',
  components: {
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
  computed: {
  },
  methods: {
    nameSave () {
      this.$store.dispatch('buildRefComputeName', this.formData.name)
    },
    descSave () {
      this.$store.dispatch('buildRefComputeDescription', this.formData.description)
    },
    primarySave () {
      this.$store.dispatch('buildRefComputePrimary', this.formData.primary)
    },
    dtprefixSave () {
      this.$store.dispatch('buildRefComputeDTprefix', this.formData.dtprefiex)
    },
    codeSave () {
      this.$store.dispatch('buildRefComputeCode', this.formData.code)
    },
    hashSave () {
      this.$store.dispatch('buildRefComputeHash', this.formData.hash)
    }
  }
}
</script>

<style scoped>
#compute-form-view {
  display: grid;
  grid-template-columns: 1fr;
}

.compute-form-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-top: 1em;
}

.compute-form-item label {
  border: 0px solid red;
  margin-right: 1em;
  justify-self: end;
}

</style>
