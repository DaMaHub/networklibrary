<template>
  <div id="source-tools">
    <li class="source-form-item">
      <label for="source-data">Please select source type</label>
      <select class="select-source-id" id="source-mapping-build" @change="sourceSelect" v-model="source">
        <option value="none" selected="">Please select</option>
        <option value="safeNetwork">SAFEnetwork</option>
        <option value="dat">HYERCORE</option>
        <option value="ipfs">IPFS</option>
        <option value="rest">REST</option>
        <option value="grpc">gRPC</option>
        <option value="csv">CVS</option>
        <option value="json">JSON</option>
      </select>
    </li>
    <div id="file-space">
      <source-file v-if="fileType === 'csv'" :sourceType="'csv'" :sourceActive="sourceState" @closeSModal="closeSModal"></source-file>
    </div>
  </div>
</template>

<script>
import SourceFile from '@/components/source/fileReader.vue'

export default {
  name: 'source-builder',
  components: {
    SourceFile
  },
  props: {
    sourceType: String,
    sourceActive: Boolean
  },
  computed: {
  },
  data: () => ({
    source: '',
    fileType: '',
    sourceState: false
  }),
  created () {
  },
  mounted () {
  },
  visualised: {
  },
  methods: {
    sourceSelect () {
      this.fileType = this.source
      if (this.source === 'csv') {
        this.sourceState = !this.sourceState
      }
    },
    closeSModal () {
      this.sourceState = !this.sourceState
    }
  }
}
</script>

<style >
</style>
