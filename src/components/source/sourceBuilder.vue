<template>
  <div id="source-tools">
    <div class="source-form-item">
      <select class="select-source-id" @change="sourceSelect" v-model="source">
        <option value="none" selected="">Please select</option>
        <!-- <option value="safeNetwork">SAFEnetwork</option> -->
        <!-- <option value="dat">HYERCORE</option> -->
        <!-- <option value="ipfs">IPFS</option> -->
        <option value="rest">REST</option>
        <!-- <option value="grpc">gRPC</option> -->
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
        <option value="sqlite">SQLite</option>
      </select>
    </div>
    <div class="source-form-item" id="file-space">
      <source-file v-if="fileType === 'csv'" :sourceType="'csv'" :sourceActive="sourceState" @closeSModal="closeSModal"></source-file>
    </div>
    <div class="source-form-item" id="file-space">
      <json-file v-if="fileType === 'json'" :sourceType="'json'" :sourceActive="sourceState" @closeSModal="closeSModal"></json-file>
    </div>
    <div class="source-form-item" id="file-space">
      <sqlite-file v-if="fileType === 'sqlite'" :sourceType="'sqlite'" :sourceActive="sourceState" @closeSModal="closeSModal"></sqlite-file>
    </div>
    <div class="source-form-item" id="file-space">
      <rest-api v-if="fileType === 'rest'" :sourceType="'rest'" :sourceActive="sourceState" @closeSModal="closeSModal"></rest-api>
    </div>
  </div>
</template>

<script>
import SourceFile from '@/components/source/fileReader.vue'
import JsonFile from '@/components/source/jsonReader.vue'
import SqliteFile from '@/components/source/sqliteReader.vue'
import RestApi from '@/components/source/restReader.vue'

export default {
  name: 'source-builder',
  components: {
    SourceFile,
    JsonFile,
    SqliteFile,
    RestApi
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
      } else if (this.source === 'json') {
        this.sourceState = !this.sourceState
      } else if (this.source === 'sqlite') {
        this.sourceState = !this.sourceState
      } else if (this.source === 'rest') {
        this.sourceState = !this.sourceState
      }
      this.$store.dispatch('buildRefPackageAPI', this.source)
    },
    closeSModal () {
      this.sourceState = !this.sourceState
    }
  }
}
</script>

<style scoped>
#source-tools {
  display: grid;
  grid-template-columns: 1fr;
}

.source-form-item {
  width: 100%;
}

.select-source-id {
  display: grid;
  justify-content: start;
  width: 300px;
}
</style>
