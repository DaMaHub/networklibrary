<template>
  <div id="compute-form-view">
    <ul>
      <li class="compute-form-item">
        <span class="required_notification">All fields required</span>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-name">Name:</label>
        <input id="compute-mapping-name" @input="nameSave" @paste="nameSave" @keyup="nameSave" v-model="formData.name" placeholder="compute mapping name" required="" type="text">
      </li>
      <li class="compute-form-item">
        <label for="compute-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" @input="descSave" @paste="descSave" @keyup="descSave" v-model="formData.description" required="" id="compute-mapping-description"></textarea>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-source">Compute Primary?</label>
        <select class="select-compute-source" @change="primarySave" v-model="formData.primary" id="">Please select
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-name">location of code:</label>
        <input id="compute-code-name" placeholder="compute code" @input="codeSave" @paste="codeSave" @keyup="codeSave" v-model="formData.code" required="" type="text">
      </li>
      <li class="compute-form-item">
        <label for="compute-add-hash">hash of code:</label>
        <input id="compute-code-hash" placeholder="compute hash" @input="hashSave" @paste="hashSave" @keyup="hashSave" v-model="formData.hash" required="" type="text">
      </li>
    </ul>
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
    codeSave () {
      this.$store.dispatch('buildRefComputeCode', this.formData.code)
    },
    hashSave () {
      this.$store.dispatch('buildRefComputeHash', this.formData.hash)
    }
  }
}
</script>

<style>

</style>
