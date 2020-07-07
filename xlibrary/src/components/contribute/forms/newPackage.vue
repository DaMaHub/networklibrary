<template>
  <div id="newpackage-view">
    <ul>
      <li class="package-form-item">
        <span class="required_notification">All fields required</span>
      </li>
      <li class="package-form-item">
        <label for="package-add-source">Source Primary?</label>
        <select class="select-package-source" id="package-primary" @change="primarySelect" v-model="packaging.primary">Please select
          <option value=true>YES</option>
          <option value=false>NO</option>
        </select>
      </li>
      <li class="package-form-item">
        <label for="package-add-name">Name:</label>
        <input id="package-mapping-name" @paste="nameSave" @keyup="nameSave" v-model="packaging.name" placeholder="package mapping name" required="" type="text">
      </li>
      <li class="package-form-item">
        <label for="package-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" required="" id="package-mapping-description" @paste="descriptionSave" @keyup="descriptionSave" v-model="packaging.description"></textarea>
      </li>
      <li class="package-form-item">
        <label for="package-add-scripting">Type of data store:</label>
        <select class="select-package-id" id="package-mapping-build" @change="apiSelect" v-model="packaging.api">
          <option value="none" selected="">Please select</option>
          <option value="safeNetwork">SAFEnetwork</option>
          <option value="ipfs">IPFS</option>
          <option value="dat">DAT</option>
          <option value="rest">REST</option>
          <option value="grpc">gRPC</option>
          <option value="csv">CVS</option>
        </select>
      </li>
      <li class="package-form-item">
        <label for="add-code-name">API base address</label>
        <input type="text"  id="mapping-base-address" placeholder="https://" required @change="apibaseSave" @paste="apibaseSave" @keyup="apibaseSave" v-model="packaging.baseaddress" />
      </li>
      <!-- <li class="package-form-item">
        <label for="add-table-name">Device address:</label>
        <input type="text"  id="mapping-device-address" placeholder="" required />
      </li> -->
      <li class="package-form-item">
        <label for="add-table-name">Datatype Path:</label>
        <input type="text"  id="mapping-endpoint-address" placeholder="" required @change="apipathSave" @paste="apipathSave" @keyup="apipathSave" v-model="packaging.apipath"/>
      </li>
      <li class="package-column-item">
        <label for="add-code-name">Column builder</label>
        <input type="text"  id="package-base-address" placeholder="column" required  v-model="packaging.columns" />
        <a href='#' id="add-column" @click.prevent="columnsSave"  >Add column</a>
      </li>
      <describe-data></describe-data>
      <li class="package-form-item">
        <a href='#' id="add-newendpoint">Add another path</a>
      </li>
    </ul>
  </div>
</template>

<script>
import DescribeData from '@/components/contribute/forms/describeData.vue'

export default {
  name: 'package-form',
  components: {
    DescribeData
  },
  data: () => ({
    packaging:
    {
      primary: null,
      name: '',
      description: '',
      api: '',
      baseaddress: '',
      apipath: ''
    },
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
      this.$store.dispatch('buildRefPackagePrimary', this.packaging.prime)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefPackageName', this.packaging.name)
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefPackageDescription', this.packaging.description)
    },
    apiSelect (as) {
      this.$store.dispatch('buildRefPackageAPI', this.packaging.api)
    },
    apibaseSave (ak) {
      this.$store.dispatch('buildRefPackageAPIbase', this.packaging.baseaddress)
    },
    apipathSave (ak) {
      this.$store.dispatch('buildRefPackageAPIpath', this.packaging.apipath)
    },
    columnsSave (ak) {
      console.log(ak)
      console.log(this.packaging.columns)
      this.$store.dispatch('buildRefPackageColumns', this.packaging.columns)
    }
  }
}
</script>

<style>
.package-form-item {
  margin: 1em;
  list-style: none;
}
</style>
