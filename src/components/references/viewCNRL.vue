<template>
  <div id="cnrl-view"> REFERENCE VIEWER
    <ul v-for="cd in referenceData" :key="cd.value.title">
      <li class="ref-wrapper">
        <component v-bind:is="viewMapper()" :mData="refTypeLive">
          <template v-slot:header>
            <!-- The code below goes into the header slot -->
            <div class="name-placer">name:</div>
            <div v-if="cd.value.concept.name" class="concept-or-comp">
              {{ cd.value.concept.name }}
            </div>
            <div v-else>
              {{ cd.value.computational.name }}
            </div>
            <p id="date-format">version 1 Date 10/01/2020</p>
            <p> {{ cd.key }} </p>
          </template>
          <template v-slot:body>
            <!-- The code below goes into the header slot -->
            <div id="datatype-slot" v-if="viewerType === 'datatype-view'">
              <header>Details</header>
              <ul>
                <li>
                  summary description: {{ cd.value.concept.description }}
                </li>
                <li>
                  Wikipedia: <a :href="cd.value.concept.wikipedia">{{ cd.value.concept.name }}</a>
                </li>
                <li>
                  RDF: <a :href="cd.value.concept.rdf">rdf file</a>
                </li>
                <li>
                  Type: {{ cd.value.concept.measurement }}
                </li>
              </ul>
            </div>
            <!-- computational reference contract formatting -->
            <div id="compute-slot" v-if="viewerType === 'compute-view'">
              <header>Details</header>
              <ul v-for="(pi, index) in cd.value.computational" :key="pi.refcontract">
                <li>
                  {{ index }} --- {{ pi }}
                </li>
              </ul>
            </div>
            <div id="packaging-slot" v-if="viewerType === 'packaging-view'">
              <header>Details</header>
              <ul v-for="(pi, index) in cd.value.concept" :key="pi.refcontract">
                <li>
                  <div class="packaging-basics" v-if="index === 'description'" >
                    {{ index }} -- {{ pi }}
                  </div>
                  <div class="packaging-basics" v-if="index === 'primary'" >
                    {{ index }} -- {{ pi }}
                  </div>
                  <div class="packaging-basics" v-if="index === 'api'" >
                    {{ index }} -- {{ pi }}
                  </div>
                  <div class="packaging-basics" v-if="index === 'apibase'" >
                    {{ index }} -- {{ pi }}
                  </div>
                  <div class="packaging-basics" v-if="index === 'apipath'" >
                    {{ index }} -- {{ pi }}
                  </div>
                  <div id="table-structure">
                    <ul>
                      <li class="packaging-lists">
                        <ul v-if="index === 'tablestructure'" >
                          <header>Datatype Mapping</header>
                          <li>
                            <div class="dt-map-key">
                              Datatype key
                            </div>
                            <div class="dt-map-column">
                              column name
                            </div>
                          </li>
                          <li v-for="ipv in pi" :key="ipv.key" >
                            <div class="dt-map-key">
                              {{ ipv.refcontract }}
                            </div>
                            <div class="dt-map-column">
                              {{ ipv.column }}
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul v-if="index === 'category'" >
                          <header>Category mapping</header>
                          <li v-for="ipv in pi" :key="ipv.key" >
                              {{ ipv.category }} -- {{ ipv.column }} -- {{ ipv.rule }}
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul v-if="index === 'tidy'" >
                          <header>Tidy rules</header>
                          <li v-for="ipv in pi" :key="ipv.key" >
                              {{ ipv.tidy }} -- {{ ipv.tidydatatype }} -- {{ ipv.tidycode }}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <div id="packaging-network">
                <header>Active use on network</header>
                <p>Networks: 3 Experiments 2 Archives</p>
              </div>
            </div>
            <div id="module-slot" v-if="viewerType === 'module-view'">
              <ul v-for="(pi, index) in cd.value.concept" :key="pi.refcontract">
                <li>
                  {{ index }} --- {{ pi }}
                </li>
              </ul>
            </div>
            <div id="visualise-slot" v-if="viewerType === 'visualise-view'">
              <ul v-for="(pi, index) in cd.value.computational" :key="pi.refcontract">
                <li>
                  {{ index }} --- {{ pi }}
                </li>
              </ul>
            </div>
            <div id="goverannce-slot">
              <header>Governance</header>
              <div id="governance-consensus">
                Coming soon
              </div>
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
import ModuleView from './moduleViewer.vue'
import VisualiseView from './visualiseViewer.vue'

export default {
  name: 'cnrlview-page',
  components: {
    DatatypeView,
    ComputeView,
    PackagingView,
    ModuleView,
    VisualiseView
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
      return this.$store.state.referenceContract[this.refTypeLive]
    }
  },
  methods: {
    viewMapper () {
      if (this.refTypeLive === 'datatype') {
        this.viewerType = 'datatype-view'
      } else if (this.refTypeLive === 'units') {
        this.viewerType = 'units-view'
      } else if (this.refTypeLive === 'compute') {
        this.viewerType = 'compute-view'
      } else if (this.refTypeLive === 'packaging') {
        this.viewerType = 'packaging-view'
      } else if (this.refTypeLive === 'module') {
        this.viewerType = 'module-view'
      } else if (this.refTypeLive === 'visualise') {
        this.viewerType = 'visualise-view'
      }
      return this.viewerType
    }
  }
}
</script>

<style>
.ref-wrapper {
  border: 1px solid grey;
  margin: 1em;
  list-style-type: none;
}

.name-placer {
  color: grey;
}

.cnrl-element {
  display: inline-block;
  margin-bottom: 1em;
}

#date-format {
  font-size: 0.6em;
}

#datatype-slot {
  margin: 4em;
}

#datatype-slot ul li {
  list-style-type: none;
}

#compute-slot header {
  margin-left: 4em;
  text-align: left;
}

#compute-slot ul li {
  margin-left: 4em;
  text-align: left;
  list-style-type: none;
}

.packaging-basics {
  text-align: left;
  margin-top: 0.5em;
}

#packaging-slot ul {
  list-style-type: none;
}

#table-structure {
  margin-top: 1em;
  text-align: left;
}

.packaging-lists {
  list-style-type: none;
}

.dt-map-key {
  display: inline;
  font-weight: normal;
  width: 300px;
  margin-right: 1em;
}

.dt-map-column {
  display: inline;
  font-weight: bold;
  min-width: 6em;
}

#packaging-network {
  margin-top: 2em;
  margin-left: 2em;
  text-align: left;
}

#goverannce-slot {
  text-align: left;
  margin: 2em;
}
</style>
