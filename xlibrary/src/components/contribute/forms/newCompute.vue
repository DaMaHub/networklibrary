<template>
  <div id="compute-form-view">
    <ul>
      <li class="compute-form-item">
        <span class="required_notification">All fields required</span>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-name">Name:</label>
        <input id="compute-mapping-name" @paste="nameSave" @keyup="nameSave" v-model="newCompute.name" placeholder="compute mapping name" required="" type="text">
      </li>
      <li class="compute-form-item">
        <label for="compute-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" @paste="descSave" @keyup="descSave" v-model="newCompute.description" required="" id="compute-mapping-description"></textarea>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-source">Compute Primary?</label>
        <select class="select-compute-source" @change="primarySave" v-model="newCompute.primary" id="">Please select
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-name">location of code:</label>
        <input id="compute-code-name" placeholder="compute code" @paste="codeSave" @keyup="codeSave" v-model="newCompute.code" required="" type="text">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'compute-form',
  components: {
  },
  data: () => ({
    newCompute:
    {
      primary: null,
      name: '',
      description: '',
      code: ''
    }
  }),
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    nameSave () {
      this.$store.dispatch('buildRefComputeName', this.newCompute.name)
    },
    descSave () {
      this.$store.dispatch('buildRefComputeDescription', this.newCompute.description)
    },
    primarySave () {
      this.$store.dispatch('buildRefComputePrimary', this.newCompute.primary)
    },
    codeSave () {
      this.$store.dispatch('buildRefComputeCode', this.newCompute.code)
    }
  }
}
</script>

<style>

</style>
