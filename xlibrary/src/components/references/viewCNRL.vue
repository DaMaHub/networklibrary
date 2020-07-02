<template>
  <div id="cnrl-view"> REFERENCE VIEWER
    <ul v-for="cd in referenceData" :key="cd.value.title">
      <li>
        <!-- <div class="cnrl-element"> <b> {{ cd.concept }} </b></div>
        <div class="cnrl-element">{{ cd.space }} </div>
        <div class="cnrl-element">{{ cd.computational }} </div>-->
        <!-- <div class="cnrl-element"> {{ cd.history }}</div>
        <div class="cnrl-element"> {{ cd.wasmfile }}</div>
        <div class="cnrl-element">{{ cd.livingpaper }}</div> -->
        <component v-bind:is="viewMapper()" :mData="refTypeLive">
          <template v-slot:header>
            <!-- The code below goes into the header slot -->
            {{ cd.value.concept.name }}
            {{ cd.key }}
          </template>
          <template v-slot:body>
            <!-- The code below goes into the header slot -->
            <div id="datatype-slot" v-if="viewerType === 'datatype-view'">
              <li>
                {{ cd.value.concept.description }}
              </li>
              <li>
                {{ cd.value.concept.wikipedia }}
              </li>
              <li>
                {{ cd.value.concept.rdf }}
              </li>
              <li>
                {{ cd.value.concept.measurement }}
              </li>
            </div>
            <div id="packaging-slot" v-if="viewerType === 'packaging-view'">
              <ul v-for="(pi, index) in cd.value.concept" :key="pi.refcontract">
                <li>
                  {{ index }} --- {{ pi }}
                </li>
              </ul>
            </div>
          </template>
        </component>
      </li>
    </ul>
  </div>
</template>

<script>
import DatatypeView from './datatypeViewer.vue'
import ComputeView from './computeViewer.vue'
import PackagingView from './packagingViewer.vue'

export default {
  name: 'cnrlview-page',
  components: {
    DatatypeView,
    ComputeView,
    PackagingView
  },
  props: {
    refTypeLive:
    {
      type: String
    }
  },
  data: () => ({
    viewerType: ''
  }),
  created () {
  },
  mounted () {
  },
  computed: {
    referenceData: function () {
      console.log('ref')
      console.log(this.$store.state.referenceContract[this.refTypeLive])
      return this.$store.state.referenceContract[this.refTypeLive]
    }
  },
  methods: {
    viewMapper () {
      console.log('view select')
      console.log(this.refTypeLive)
      if (this.refTypeLive === 'datatype') {
        this.viewerType = 'datatype-view'
      } else if (this.refTypeLive === 'units') {
        this.viewerType = 'units-view'
      } else if (this.refTypeLive === 'compute') {
        this.viewerType = 'compute-view'
      } else if (this.refTypeLive === 'packaging') {
        this.viewerType = 'packaging-view'
      }
      return this.viewerType
    }
  }
}
</script>

<style>
.cnrl-element {
  display: inline-block;
  margin-bottom: 1em;
}
</style>
