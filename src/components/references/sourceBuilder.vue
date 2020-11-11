<template>
  <div id="source-tools">
    <li class="source-form-item">
      <label for="source-data">Please select source type</label>
      <select class="select-source-id" id="source-mapping-build" @change="sourceSelect" v-model="source">
        <option value="none" selected="">Please select</option>
        <option value="safeNetwork">SAFEnetwork</option>
        <option value="ipfs">IPFS</option>
        <option value="dat">DAT</option>
        <option value="rest">REST</option>
        <option value="grpc">gRPC</option>
        <option value="csv">CVS</option>
      </select>
    </li>
  </div>
</template>

<script>

export default {
  name: 'source-builder',
  components: {
  },
  props: {
    mData: String
  },
  computed: {
  },
  data: () => ({
    source: ''
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    sourceSelect () {
      console.log('source file type asked for')
      console.log(this.source)
    }
  }
}
</script>

<style >
</style>
