import Vue from 'vue'
import Vuex from 'vuex'
import NetworkConnect from '@/refflow/cryptoUtility.js'
import modules from './modules'

const refFlow = new NetworkConnect()
Vue.use(Vuex)

const dataTitle = {}
dataTitle[0] = { title: 'Data', type: 'source-builder' }
dataTitle[1] = { title: 'Curation', type: 'reference-builder' }

export default new Vuex.Store({
  modules,
  state: {
    dashboardGrid: [
      { x: 0, y: 0, w: 2, h: 2, i: '0' }, { x: 2, y: 0, w: 10, h: 10, i: '1' } // , { x: 8, y: 0, w: 3, h: 2, i: '2' }, { x: 0, y: 1, w: 7, h: 4, i: '3' }
    ],
    referenceData: dataTitle,
    referenceContract: [],
    packagingDatatypes: [],
    newRefcontractForm: {},
    newComputeForm: {},
    newPackingForm:
    {
      apicolumns: [],
      apicolHolder: [[]],
      catCount: 0,
      tidyCount: 0,
      category: [],
      tidy: []
    },
    newVisualiseForm: {
      structure:
      {
        name: '',
        elements: []
      }
    }
  },
  mutations: {
    ADD_REFCONTRACT_PRIMARY (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'primary', inVerified)
    },
    ADD_REFCONTRACT_TYPE (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'type', inVerified)
    },
    ADD_REFCONTRACT_NAME (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'name', inVerified)
    },
    ADD_REFCONTRACT_DESCRIP (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'description', inVerified)
    },
    ADD_REFCONTRACT_WIKI (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'wikipedia', inVerified)
    },
    ADD_REFCONTRACT_RDF (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'rdf', inVerified)
    },
    ADD_REFCONTRACT_MEASUREMENT (state, inVerified) {
      Vue.set(state.newRefcontractForm, 'measurement', inVerified)
    },
    ADD_REFCONTPACK_PRIMARY (state, inVerified) {
      Vue.set(state.newPackingForm, 'primary', inVerified)
    },
    ADD_REFCONTPACK_NAME (state, inVerified) {
      Vue.set(state.newPackingForm, 'name', inVerified)
    },
    ADD_REFCONTPACK_DESCRIP (state, inVerified) {
      Vue.set(state.newPackingForm, 'description', inVerified)
    },
    ADD_REFCONTPACK_API (state, inVerified) {
      Vue.set(state.newPackingForm, 'api', inVerified)
    },
    ADD_REFCONTPACK_APIBASE (state, inVerified) {
      Vue.set(state.newPackingForm, 'apibase', inVerified)
    },
    ADD_REFCONTPACK_APIPATH (state, inVerified) {
      Vue.set(state.newPackingForm, 'apipath', inVerified)
    },
    ADD_REFCONTPACK_APICOL (state, inVerified) {
      console.log('api COLUM')
      console.log(inVerified)
      let colCount
      if (state.newPackingForm.apicolumns.length === 0) {
        colCount = 1
      } else {
        colCount = state.newPackingForm.apicolumns.length + 1
      }
      const newColumn = {}
      newColumn.count = colCount
      newColumn.name = inVerified
      state.newPackingForm.apicolumns.push(newColumn)
      state.newPackingForm.apicolHolder.push([])
    },
    ADD_REFCONTPACK_CATEGORY (state, inVerified) {
      // keep tabs on number of categories bundle being submitted
      const updatCount = state.newPackingForm.catCount++
      Vue.set(state.newPackingForm, 'catCount', updatCount)
      Vue.set(state.newPackingForm, 'hcategory', inVerified)
    },
    ADD_REFCONTPACK_CATCOL (state, inVerified) {
      Vue.set(state.newPackingForm, 'hcatcolumn', inVerified)
    },
    ADD_REFCONTPACK_CATRULE (state, inVerified) {
      Vue.set(state.newPackingForm, 'hcatrule', inVerified)
    },
    BUNDLE_CATEGORY (state, inVerified) {
      const catBundle = {}
      catBundle.category = state.newPackingForm.hcategory
      catBundle.column = state.newPackingForm.hcatcolumn
      catBundle.rule = state.newPackingForm.hcatrule
      state.newPackingForm.category.push(catBundle)
    },
    ADD_REFCONTPACK_TIDY (state, inVerified) {
      // keep tabs on number of tidy bundle being submitted
      const updatCount = state.newPackingForm.tidyCount++
      Vue.set(state.newPackingForm, 'tidyCount', updatCount)
      Vue.set(state.newPackingForm, 'htidy', inVerified)
    },
    ADD_REFCONTPACK_TIDYDT (state, inVerified) {
      Vue.set(state.newPackingForm, 'htidydatatype', inVerified)
    },
    ADD_REFCONTPACK_TIDYCODE (state, inVerified) {
      Vue.set(state.newPackingForm, 'htidycode', inVerified)
    },
    BUNDLE_TIDY (state, inVerified) {
      const tidyBundle = {}
      tidyBundle.tidy = state.newPackingForm.htidy
      tidyBundle.datatype = state.newPackingForm.htidydatatype
      tidyBundle.rule = state.newPackingForm.htidycode
      state.newPackingForm.tidy.push(tidyBundle)
    },
    ADD_REFCOMPUTE_PRIMARY (state, inVerified) {
      Vue.set(state.newComputeForm, 'primary', inVerified)
    },
    ADD_REFCOMPUTE_NAME (state, inVerified) {
      Vue.set(state.newComputeForm, 'name', inVerified)
    },
    ADD_REFCOMPUTE_DESCRIP (state, inVerified) {
      Vue.set(state.newComputeForm, 'description', inVerified)
    },
    ADD_REFCOMPUTE_CODE (state, inVerified) {
      Vue.set(state.newComputeForm, 'code', inVerified)
    },
    ADD_REFCOMPUTE_HASH (state, inVerified) {
      Vue.set(state.newComputeForm, 'hash', inVerified)
    },
    ADD_REFVISUALISE_PRIMARY (state, inVerified) {
      Vue.set(state.newVisualiseForm, 'primary', inVerified)
    },
    ADD_REFVISUALISE_NAME (state, inVerified) {
      Vue.set(state.newVisualiseForm, 'name', inVerified)
    },
    ADD_REFVISUALISE_DESCRIPTION (state, inVerified) {
      Vue.set(state.newVisualiseForm, 'description', inVerified)
    },
    ADD_REFVISUALISE_STRUCTURE (state, inVerified) {
      Vue.set(state.newVisualiseForm.structure, 'name', inVerified)
    },
    ADD_REFVISUALISE_ELEMENTLABEL (state, inVerified) {
      // Vue.set(state.newVisualiseForm.structure, 'elements', inVerified)
    },
    ADD_REFVISUALISE_ELEMENTTYPE (state, inVerified) {
      // Vue.set(state.newVisualiseForm.structure, 'elements', inVerified)
    },
    ADD_REFVISUALISE_ELEMENTPAIR (state, inVerified) {
      state.newVisualiseForm.structure.elements.push(inVerified)
      console.log(state.newVisualiseForm.structure.elements)
    }
  },
  actions: {
    async startconnectNSnetwork (context, update) {
      const peerLive = await refFlow.connectPeerNSnetwork(update.network, update.settings)
      // console.log('peer star returned')
      console.log(peerLive)
      // context.commit('setAuthorisation', true)
    },
    async annonconnectNSnetwork (context, update) {
      console.log('annon connect')
      // const annonlive = await refFlow.connectNSnetwork(update.network, update.settings)
      // console.log(annonlive)
    },
    actionLocalGrid (context, update) {
      console.log('action test watch called')
    },
    buildRefcontractPrimary (context, update) {
      context.commit('ADD_REFCONTRACT_PRIMARY', update)
    },
    buildRefcontractType (context, update) {
      context.commit('ADD_REFCONTRACT_TYPE', update)
    },
    buildRefContractName (context, update) {
      context.commit('ADD_REFCONTRACT_NAME', update)
    },
    buildRefContractDescription (context, update) {
      context.commit('ADD_REFCONTRACT_DESCRIP', update)
    },
    buildRefContractWiki (context, update) {
      context.commit('ADD_REFCONTRACT_WIKI', update)
    },
    buildRefContractRDF (context, update) {
      context.commit('ADD_REFCONTRACT_RDF', update)
    },
    buildRefcontractMeasurement (context, update) {
      context.commit('ADD_REFCONTRACT_MEASUREMENT', update)
    },
    buildRefPackagePrimary (context, update) {
      context.commit('ADD_REFCONTPACK_PRIMARY', update)
    },
    buildRefPackageName (context, update) {
      context.commit('ADD_REFCONTPACK_NAME', update)
    },
    buildRefPackageDescription (context, update) {
      context.commit('ADD_REFCONTPACK_DESCRIP', update)
    },
    buildRefPackageAPI (context, update) {
      context.commit('ADD_REFCONTPACK_API', update)
    },
    buildRefPackageAPIbase (context, update) {
      context.commit('ADD_REFCONTPACK_APIBASE', update)
    },
    buildRefPackageAPIpath (context, update) {
      context.commit('ADD_REFCONTPACK_APIPATH', update)
    },
    buildRefPackageColumns (context, update) {
      context.commit('ADD_REFCONTPACK_APICOL', update)
    },
    buildRefPackageCategory (context, update) {
      context.commit('ADD_REFCONTPACK_CATEGORY', update)
    },
    buildRefPackageCategoryColumn (context, update) {
      context.commit('ADD_REFCONTPACK_CATCOL', update)
    },
    buildRefPackageCategoryRule (context, update) {
      context.commit('ADD_REFCONTPACK_CATRULE', update)
    },
    buildRefPackageTidy (context, update) {
      context.commit('ADD_REFCONTPACK_TIDY', update)
    },
    buildRefPackageTidyDT (context, update) {
      context.commit('ADD_REFCONTPACK_TIDYDT', update)
    },
    buildRefPackageTidycode (context, update) {
      context.commit('ADD_REFCONTPACK_TIDYCODE', update)
    },
    buildRefComputePrimary (context, update) {
      context.commit('ADD_REFCOMPUTE_PRIMARY', update)
    },
    buildRefComputeName (context, update) {
      context.commit('ADD_REFCOMPUTE_NAME', update)
    },
    buildRefComputeDescription (context, update) {
      context.commit('ADD_REFCOMPUTE_DESCRIP', update)
    },
    buildRefComputeCode (context, update) {
      context.commit('ADD_REFCOMPUTE_CODE', update)
    },
    buildRefComputeHash (context, update) {
      context.commit('ADD_REFCOMPUTE_HASH', update)
    },
    buildVisualisePrimary (context, update) {
      context.commit('ADD_REFVISUALISE_PRIMARY', update)
    },
    buildRefVisualiseName (context, update) {
      context.commit('ADD_REFVISUALISE_NAME', update)
    },
    buildRefVisualiseDescription (context, update) {
      context.commit('ADD_REFVISUALISE_DESCRIPTION', update)
    },
    buildRefVisualiseStructure (context, update) {
      context.commit('ADD_REFVISUALISE_STRUCTURE', update)
    },
    buildRefVisualiseStructureElementLabel (context, update) {
      context.commit('ADD_REFVISUALISE_ELEMENTNAME', update)
    },
    buildRefVisualiseStructureElementType (context, update) {
      context.commit('ADD_REFVISUALISE_ELEMENTPAIR', update)
    },
    buildRefPackageCatBundle (context, update) {
      context.commit('BUNDLE_CATEGORY', update)
    },
    buildRefPackageTidyBundle (context, update) {
      context.commit('BUNDLE_TIDY', update)
    }
  },
  strict: false // process.env.NODE_ENV !== 'production'
})
