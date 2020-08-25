<template>
  <div id="newpackage-view"> pform == {{ formData }} ==live {{ livePackForm }}
    <ul>
      <li class="package-form-item">
        <span class="required_notification">All fields required</span>
      </li>
      <li class="package-form-item">
        <label for="package-add-source">Source Primary?</label>
        <select class="select-package-source" id="package-primary" @change="primarySelect" v-model="formData.primary">Please select
          <option value=true>YES</option>
          <option value=false>NO</option>
        </select>
      </li>
      <li class="package-form-item">
        <label for="package-add-name">Name:</label>
        <input id="package-mapping-name" @input="nameSave" @paste="nameSave" @keyup="nameSave" v-model="formData.name" placeholder="package mapping name" required="" type="text">
      </li>
      <li class="package-form-item">
        <label for="package-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" required="" id="package-mapping-description" @input="descriptionSave" @paste="descriptionSave" @keyup="descriptionSave" v-model="formData.description"></textarea>
      </li>
      <li class="package-form-item">
        <label for="package-add-scripting">Type of data store:</label>
        <select class="select-package-id" id="package-mapping-build" @change="apiSelect" v-model="formData.api">
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
        <input type="text"  id="mapping-base-address" placeholder="https://" required @change="apibaseSave" @input="apibaseSave" @paste="apibaseSave" @keyup="apibaseSave" v-model="formData.baseaddress" />
      </li>
      <!-- <li class="package-form-item">
        <label for="add-table-name">Device address:</label>
        <input type="text"  id="mapping-device-address" placeholder="" required />
      </li> -->
      <li class="package-form-item">
        <label for="add-table-name">Datatype Path:</label>
        <input type="text"  id="mapping-endpoint-address" placeholder="" required @change="apipathSave" @input="apipathSave" @paste="apipathSave" @keyup="apipathSave" v-model="formData.apipath"/>
      </li>
      <li class="package-column-item">
        <label for="add-code-name">Column builder</label>
        <input type="text"  id="package-base-address" placeholder="column" required  v-model="formData.columns" />
        <a href='#' id="add-column" @click.prevent="columnsSave" >Add column</a>
      </li>
      <describe-data></describe-data>
      <li class="package-form-item">
        <a href='#' id="add-newendpoint">Add another path</a>
      </li>
      <li v-for="dc of catnumber" :key="dc.id" >cc{{ dc }}
          <describe-category :catForm="formData.catHolder[dc]"></describe-category>
      </li>
      <li>
        <a href='#' id="add-category" @click.prevent="addCategory" >Add category</a>
      </li>
      <li v-for="dty of tidynumber" :key="dty.id" >dd{{ dty }}
        <describe-tidy :tidyForm="formData.tidyHolder[dty]"></describe-tidy>
      </li>
      <li>
        <a href='#' id="add-tidy-code" @click.prevent="addTidyItem">Add tidy rule</a>
      </li>
    </ul>
  </div>
</template>

<script>
import DescribeData from '@/components/contribute/forms/describeData.vue'
import DescribeCategory from '@/components/contribute/forms/describeCategory.vue'
import DescribeTidy from '@/components/contribute/forms/describeTidy.vue'

export default {
  name: 'package-form',
  components: {
    DescribeData,
    DescribeCategory,
    DescribeTidy
  },
  computed: {
    livePackForm: function () {
      return this.$store.state.newPackingForm
    }
  },
  props: {
    formData: {
      type: Object
    }
  },
  data: () => ({
    catnumber: [0],
    tidynumber: [0],
    index: 0
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    primarySelect () {
      this.$store.dispatch('buildRefPackagePrimary', this.formData.primary)
    },
    nameSave (k) {
      this.$store.dispatch('buildRefPackageName', this.formData.name)
    },
    descriptionSave (dk) {
      this.$store.dispatch('buildRefPackageDescription', this.formData.description)
    },
    apiSelect (as) {
      this.$store.dispatch('buildRefPackageAPI', this.formData.api)
    },
    apibaseSave (ak) {
      this.$store.dispatch('buildRefPackageAPIbase', this.formData.baseaddress)
    },
    apipathSave (ak) {
      this.$store.dispatch('buildRefPackageAPIpath', this.formData.apipath)
    },
    columnsSave (ak) {
      // console.log(ak)
      // console.log(this.packaging.columns)
      this.$store.dispatch('buildRefPackageColumns', this.formData.columns)
    },
    addCategory () {
      // tell vuex to bundle last entry together
      this.$store.dispatch('buildRefPackageCatBundle')
      this.catnumber.push(1)
    },
    addTidyItem () {
      // tell vuex to bundle last entry together
      this.$store.dispatch('buildRefPackageTidyBundle')
      this.tidynumber.push(1)
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
