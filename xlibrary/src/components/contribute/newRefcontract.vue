<template>
  <div id="newapi-view">
    <header>New Reference Contract</header>
    <form id="newapi_form" name="newapi_form">
    <ul>
      <li class="api-form-item">
        <label for="api-add-type">Select type of Reference Contract</label>
        <select v-model="formType" @change="importForm" class="select-api-id" id="api-mapping-type" >DT Packaging
          <option value="new-datatype">Datatype</option>
          <option value="new-units">Units</option>
          <option value="new-compute">Compute</option>
          <option value="new-packaging">Packaging</option>
          <!-- <option value="new-experiment">Experiment</option> -->
        </select>
      </li>
      <component v-bind:is="formType"></component>
      <li class="api-form-item">
        <button class="submit" type="submit"  id="save-new-refcontract" @click.prevent="saveRefContract()">Save</button>
        <button class="submit" type="submit" id="check-new-refcontract" @click.prevent="checkRefContract()">Check Contract</button>
        <button class="submit" type="submit" id="network-library-submit" @click.prevent="networkLibraryRefContract()" >Submit to network library</button>
      </li>
      <li class="api-form-item">
        <section id="api-feedback">
        </section>
      </li>
    </ul>
    </form>
  </div>
</template>

<script>
import NewDatatype from '@/components/contribute/forms/newDatatype.vue'
import NewCompute from '@/components/contribute/forms/newCompute.vue'
import NewUnits from '@/components/contribute/forms/newUnits.vue'
import NewPackaging from '@/components/contribute/forms/newPackage.vue'

export default {
  name: 'newapi-page',
  components: {
    NewDatatype,
    NewCompute,
    NewUnits,
    NewPackaging
  },
  data: () => ({
    formType: null
  }),
  created () {
  },
  mounted () {
  },
  computed: {
    newRefContractLive: function () {
      console.log('new contract in making???')
      console.log(this.$store.state.newRefcontractForm)
      return this.$store.state.newRefcontractForm
    }
  },
  methods: {
    importForm (ef) {
      console.log('what form?')
      console.log(this.formType)
    },
    saveRefContract () {
      console.log('save new Ref Contract')
      // pull together other parts of refcontract
      const refContract = {}
      refContract.reftype = this.formType
      refContract.action = 'PUT'
      this.$store.dispatch('sendMessage', refContract)
    }
  }
}
</script>

<style>
#newapi-view {
  background-color: #EBE7E0;
  border: 4px solid lightgrey;
  padding: 10px;
  height: 100%;
  overflow: visible;
}

.api-form-item {
  display: block;
  margin-bottom: 2em;
}

.api-form-item label {
  display: inline-block;
  border: 0px solid black;
  width: 160px;
}
</style>
