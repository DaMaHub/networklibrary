<template>
  <div id="newpackage-view">
    <div class="package-form-item">
      <span class="required_notification">All fields required</span>
    </div>
    <div class="package-form-item">
      <label for="package-add-source">Source Primary?</label>
      <select class="select-package-source" id="package-primary" @change="primarySelect" v-model="formData.primary">Please select
        <option value=true>YES</option>
        <option value=false>NO</option>
      </select>
    </div>
    <div class="package-form-item">
      <label for="package-add-name">Name:</label>
      <input id="package-mapping-name" @input="nameSave" @paste="nameSave" @keyup="nameSave" v-model="formData.name" placeholder="package mapping name" required="" type="text">
    </div>
    <div class="package-form-item">
      <label for="package-add-description">Description:</label>
      <textarea name="message" cols="40" rows="2" required="" id="package-mapping-description" @input="descriptionSave" @paste="descriptionSave" @keyup="descriptionSave" v-model="formData.description"></textarea>
    </div>
    <div class="package-form-item">
      <label for="package-source-data">Data source:</label>
      <div id="source-location">
        <source-builder></source-builder>
      </div>
    </div>
    <div class="package-form-item">
      <label for="tidy">Authorisation required?</label>
      <input type="checkbox" id="auth-access" @change="authrequiredSelect" v-model="formData.authrequired">
    </div>
    <div class="package-form-item">Authorisation
      <describe-auth v-if="livePackForm.authrequired === true" :formData="formData"></describe-auth>
    </div>
    <div id="desribe-data" v-if="datasourceLive === true">
      <div id="sqlite-table-name" v-if="filetypeLive === 'sqlite'">
        <label for="add-code-name">SQLite table name: </label>
        <input type="text"  id="table-name-sqlite" placeholder="" required @input="sqlitetableSave" @paste="sqlitetableSave" @keyup="sqlitetableSave"  v-model="formData.sqlitetable" />
      </div>
      <div class="package-column-item">
        <label for="add-code-name">Column builder</label>
        <input type="text"  id="package-base-address" placeholder="column" required  v-model="formData.columns" />
        <a href='#' id="add-column" @click.prevent="columnsSave" >Add column </a>
        <a href='#' id="auto-column" @click.prevent="columnsAuto" > Auto add</a>
      </div>
      <div class="package-column-item">
        <describe-data></describe-data>
      </div>
      <!-- <li class="package-form-item">
        <a href='#' id="add-newendpoint">Add another path</a>
      </li> -->
      <div class="pack-info">
        <a href='#' id="add-category" @click.prevent="addCategory" >Add category</a>
      </div>
      <div class="pack-info" v-for="dc of catCount" :key="dc.id" >
          <describe-category :catID="dc" :catForm="formData.catHolder[dc]"></describe-category>
      </div>
      <div class="pack-info">
        <a href='#' id="add-tidy-code" @click.prevent="addTidyItem">Add tidy rule</a>
      </div>
      <div class="pack-info" v-for="dty of tidyCount" :key="dty.id" >
        <describe-tidy :tidyID="dty" :tidyForm="formData.tidyHolder[dty]"></describe-tidy>
      </div>
      <div class="package-form-item">DEVICE INFO
        <describe-device></describe-device>
      </div>
    </div>
  </div>
</template>

<script>
import SourceBuilder from '@/components/source/sourceBuilder.vue'
import DescribeDevice from '@/components/contribute/forms/describeDevice.vue'
import DescribeAuth from '@/components/contribute/forms/describeAuth.vue'
import DescribeData from '@/components/contribute/forms/describeData.vue'
import DescribeCategory from '@/components/contribute/forms/describeCategory.vue'
import DescribeTidy from '@/components/contribute/forms/describeTidy.vue'

export default {
  name: 'package-form',
  components: {
    SourceBuilder,
    DescribeDevice,
    DescribeAuth,
    DescribeData,
    DescribeCategory,
    DescribeTidy
  },
  computed: {
    livePackForm: function () {
      return this.$store.state.newPackingForm
    },
    catCount: function () {
      return this.$store.state.newPackingForm.catCount
    },
    tidyCount: function () {
      return this.$store.state.newPackingForm.tidyCount
    },
    fileFeedback: function () {
      return this.$store.state.fileFeedback.columns
    },
    datasourceLive: function () {
      return this.$store.state.sourceDataSelected
    },
    filetypeLive: function () {
      return this.$store.state.sourceFiletype
    }
  },
  props: {
    formData: {
      type: Object
    }
  },
  data: () => ({
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
    authtokenSave (ak) {
      this.$store.dispatch('buildRefPackageAPIauth', this.formData.authorisation)
    },
    authrequiredSelect (ak) {
      this.$store.dispatch('buildRefPackageAuthrequired', this.formData.authrequired)
    },
    sqlitetableSave (ak) {
      this.$store.dispatch('buildRefPackageSQLitetable', this.formData.sqlitetable)
    },
    columnsSave (ak) {
      this.$store.dispatch('buildRefPackageColumns', this.formData.columns)
    },
    columnsAuto (ak) {
      this.$store.dispatch('buildRefPackageAutoColumns', 'auto')
    },
    addCategory () {
      // tell vuex to bundle last entry together
      this.$store.dispatch('buildRefPackageCatBundle')
      this.formData.catHolder[this.catCount] = {}
    },
    addTidyItem () {
      // tell vuex to bundle last entry together
      this.$store.dispatch('buildRefPackageTidyBundle')
      this.formData.tidyHolder[this.tidyCount] = {}
    }
  }
}
</script>

<style scoped>
#newpackage-view {
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.2em;
}

.package-form-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1em;
  list-style: none;
}

.package-form-item label {
  border: 0px solid red;
  margin-right: 1em;
  justify-self: end;
}

.pack-info {
  padding: 1em;
  list-style: none;
}

#source-holder {
  display: grid;
  border: 2px solid rgb(0, 0, 0);
}

#auto-column {
  margin-left: 2em;
  border: 1px solid red;
}

.package-column-item {
  padding-bottom: 1em;
  list-style: none;
}

#sqlite-table-name {
  margin-bottom: 1em;
}

#table-name-sqlite {
  width: 300px;
}

</style>
