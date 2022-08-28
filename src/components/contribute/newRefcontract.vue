<template>
  <div id="newapi-view">
    <!-- <div id="new-rfheader">New Reference Contract</div> -->
    <div id="newapi_form" name="newapi_form">
      <div class="api-form-item">
        <div id="form-api-section">
          <label class="select-api-id" for="api-add-type">Select type of Reference Contract</label>
          <select v-model="formType" @change="importForm" class="select-api-id">DT Packaging
            <option value="new-datatype">Datatype</option>
            <!-- <option value="new-units">Units</option> -->
            <option value="new-compute">Compute</option>
            <option value="new-packaging">Data Packaging</option>
            <option value="new-visualise">Visualise</option>
            <!-- <option value="new-experiment">Experiment</option> -->
          </select>
        </div>
      </div>
      <component class="api-form-item" v-bind:is="formType" :formData="inputData" ></component>
      <div class="api-form-item">
        <button class="submit-save" type="submit"  id="save-new-refcontract" @click.prevent="saveRefContract()">Save</button>
        <!-- <button class="submit" type="submit" id="check-new-refcontract" @click.prevent="checkRefContract()">Check Contract</button>
        <button class="submit" type="submit" id="network-library-submit" @click.prevent="networkLibraryRefContract()" >Submit to network library</button> -->
      </div>
      <div class="api-form-item">
        <section id="api-feedback">
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NewDatatype from '@/components/contribute/forms/newDatatype.vue'
import NewCompute from '@/components/contribute/forms/newCompute.vue'
import NewUnits from '@/components/contribute/forms/newUnits.vue'
import NewPackaging from '@/components/contribute/forms/newPackage.vue'
import NewVisualise from '@/components/contribute/forms/newVisualise.vue'

export default {
  name: 'newapi-page',
  components: {
    NewDatatype,
    NewCompute,
    NewUnits,
    NewPackaging,
    NewVisualise
  },
  data: () => ({
    formType: null,
    inputData:
    {
      catHolder: {},
      tidyHolder: {},
      visHolder: []
    }
  }),
  created () {
  },
  mounted () {
  },
  computed: {
    newRefContractLive: function () {
      return this.$store.state.newRefcontractForm
    },
    catCountLive: function () {
      return this.$store.state.newPackingForm.catCount
    },
    tidyCountLive: function () {
      return this.$store.state.newPackingForm.tidyCount
    }
  },
  methods: {
    importForm (ef) {
    },
    saveRefContract () {
      // pull together other parts of refcontract
      const refContract = {}
      refContract.reftype = this.formType
      refContract.action = 'PUT'
      this.$store.dispatch('sendMessage', refContract)
      // reset the form data
      this.inputData =
      {
        catHolder: {},
        tidyHolder: {},
        visHolder: []
      }
    }
  }
}
</script>

<style scoped>
#newapi-view {
  display: grid;
  justify-content: center;
  background-color: #EBE7E0;
  border: 4px solid lightgrey;
  padding: 10px;
}

#newapi_form {
  display: grid;
  grid-template-columns: 1fr;
  width: 90%;
  justify-content: center;
  align-content: center;
  min-width: 360px;
}

.api-form-item {
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 2em;
}

#form-api-section {
  font-size: 1.2em;
}

.select-api-id {
  width: 50%;
  font-size: 1.2em;
}

label {
  margin-bottom: .5em;
}

#save-new-refcontract {
  display: grid;
  text-align: center;
  font-size: 2em;
}
</style>
