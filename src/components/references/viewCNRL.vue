<template>
  <div id="cnrl-view"> REFERENCE VIEWER
    <ul v-for="cd in referenceData" :key="cd.value.title">
      <li class="ref-wrapper">
        <component  v-if="cd.value.refcontract !== 'module'" v-bind:is="viewMapper()" :mData="refTypeLive">
          <template v-slot:header>
            <!-- The code below goes into the header slot -->
            <div id="refcontract-summary">
              <div class="refname">
                <div class="refinfo-col1">Ref. contract name:</div>
                <div v-if="cd.value.concept.name" class="refinfo-col2">
                  {{ cd.value.concept.name }}
                </div>
                <div v-else class="refinfo-col2">
                  {{ cd.value.computational.name }}
                </div>
              </div>
              <div class="refname">
                <div class="refinfo-col1">Version & Date:</div>
                <div class="refinfo-col2">1.0 **/**/****</div>
              </div>
            </div>
            <div class="refcontract-summary">
              <div> {{ cd.key }} </div>
            </div>
          </template>
          <template v-slot:body>
            <!-- The code below goes into the header slot -->
            <div id="datatype-slot" v-if="viewerType === 'datatype-view'">
              <header>Details</header>
              <div class="ref-description">
                <div class="refinfo-col1">
                  summary description:
                </div>
                <div class="refinfo-col2">
                  {{ cd.value.concept.description }}
                </div>
              </div>
              <div class="ref-description">
                <div class="refinfo-col1">
                  Wikipedia:
                </div>
                <div class="refinfo-col2">
                  <a :href="cd.value.concept.wikipedia"> {{ cd.value.concept.name }}</a>
                </div>
              </div>
              <div class="ref-description">
                <div class="refinfo-col1">
                  RDF:
                </div>
                <div class="refinfo-col2">
                  <a :href="cd.value.concept.rdf">rdf file</a>
                </div>
              </div>
              <div class="ref-description">
                <div class="refinfo-col1">
                  Type:
                </div>
                <div class="refinfo-col2">
                  {{ cd.value.concept.measurement }}
                </div>
              </div>
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
                  <div class="packaging-basics" v-if="index === 'filename'" >
                    {{ index }} -- {{ pi }}
                  </div>
                  <div class="packaging-basics" v-if="index === 'sqlitetablename'" >
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
              <div id="device-info">
                Device {{ cd.value.concept.device }}
              </div>
              <div id="packaging-network">
                <header>Active use on network</header>
                <p>Networks: 3 Experiments 2 Archives</p>
              </div>
            </div>
            <div id="visualise-slot" v-if="viewerType === 'visualise-view'">
              <header>Details</header>
              <ul v-for="(pi, index) in cd.value.computational" :key="pi.refcontract">
                <li>
                  <div class="vis-type">
                    {{ index }}
                  </div>
                  <div class="vis-info">
                    {{ pi }}
                  </div>
                </li>
              </ul>
            </div>
            <div id="goverannce-slot">
              <header>Governance</header>
              <div id="governance-consensus">
                Coming soon
              </div>
            </div>
            <div id="board-slot" v-if="viewerType === 'experiment'">BOARD
              <ul v-for="(pi, index) in cd.value.concept" :key="pi.refcontract">
                <li>
                  {{ index }} --- {{ pi }}
                </li>
              </ul>
            </div>
            <div id="module-slot" v-if="viewerType === 'module-view'">
              module lib:
              <ul v-for="(pi, index) in cd.value" :key="pi.refcontract">
                <li>
                  {{ index }} --- {{ pi }}
                </li>
              </ul>
            </div>
          </template>
        </component>
        <component v-else v-bind:is="viewMapper()">
        <template v-slot:header>
        <div v-if="cd.value.info.moduleinfo">
          Module info:
          <div class="key-hash"> {{ cd.key }} </div>
          <div class="value-info"> {{ cd.value.info.moduleinfo.name }} </div>
          <div class="value-info">{{ cd.value.info }}</div>
        </div>
        <div v-else>
          Module compute:
          <div class="key-hash"> {{ cd.key }} </div>
          <div class="key-hash">type: {{ cd.value.type }} link-- {{ cd.value.link }}</div>
          <div class="value-info"> {{ cd.value.info }} </div>
        </div>
        </template>
        <template v-slot:body>
          <div id="module-slot" v-if="viewerType === 'module-view' && refTypeLive !== 'module'">
            <ul v-for="(pi, index) in cd.value.info.option" :key="pi.id">
              <li>
                {{ index }} --- {{ pi }}
              </li>
            </ul>
          </div>
        </template>
      </component>
      </li>
    </ul>
    <ul v-for="pb in boardPeerData" :key="pb.id"><!-- peer library contract display -->
      <li class="ref-wrapper">
        <component v-bind:is="viewMapper()">
          Peer Boards
          <template v-slot:header>
            <div  v-if="viewerType === 'board-view'">
              <div v-if="pb.key">
                <div>Board: {{ pb.key }}</div>
                <div>Contract: {{ pb.value.refcontract }}</div>
                <div>Modules: {{ pb.value.modules }}</div>
                <div>Modules: {{ pb.value.concept }}</div>
              </div>
            </div>
            <div v-else>
              ----
            </div>
          </template>
          <template v-slot:body>
            <div id="module-slot" v-if="viewerType === 'board-view'">
              <ul v-for="(pi, index) in pb.modules" :key="pi.id">
                <li>
                <div> {{ index }} --- {{ pi.key }} </div>
                <div> {{ index }} --- {{ pi.value }} </div>
                <div> ----------------------------- </div>
                </li>
              </ul>
            </div>
          </template>
        </component>
      </li>
    </ul>
    <ul v-for="pcd in referencePeerData" :key="pcd.is">
      <li class="ref-wrapper"  v-if="viewerType === 'module-view' && refTypeLive === 'peer-modules'">
        Peer Module Library
        <component v-bind:is="viewMapper()">
          <template v-slot:header>
          <div v-if="pcd.value">
              <div class="key-hash"> {{ pcd.key }} </div>
              <div class="key-hash">type: {{ pcd.value.type }} link-- {{ pcd.value.link }}</div>
              <div>  {{ pcd.value.type }} </div>
              <div>  {{ pcd.value.info }} </div>
              <div> ----------------------------- </div>
          </div>
          <div v-else>
            Module compute: {{ pcd.value.key }}
          </div>
          </template>
          <!--<template v-slot:body>ff {{ viewerType }} {{ refTypeLive  }}
            <div id="module-slot" v-if="viewerType === 'module-view' && refTypeLive === 'peer-modules'">
              <ul v-for="(pi, index) in pcd.value.info" :key="pi.id">
                <li>
                  <div> {{ index }} --- {{ pcd }} </div>
                </li>
              </ul>
            </div>
          </template>-->
        </component>
      </li>
    </ul>
  </div>
</template>

<script>
import DatatypeView from './datatypeViewer.vue'
import ComputeView from './computeViewer.vue'
import PackagingView from './packagingViewer.vue'
import VisualiseView from './visualiseViewer.vue'
import ModuleView from './moduleViewer.vue'
import BoardView from './boardViewer.vue'

export default {
  name: 'cnrlview-page',
  components: {
    DatatypeView,
    ComputeView,
    PackagingView,
    BoardView,
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
      return this.$store.state.liveRefContIndex[this.refTypeLive]
    },
    boardPeerData: function () {
      return this.$store.state.livePeerBoardContract
    },
    referencePeerData: function () {
      return this.$store.state.livePeerRefContAll
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
      } else if (this.refTypeLive === 'visualise') {
        this.viewerType = 'visualise-view'
      } else if (this.refTypeLive === 'experiment') {
        this.viewerType = 'module-view'
      } else if (this.refTypeLive === 'module') {
        this.viewerType = 'module-view'
      } else if (this.refTypeLive === 'peer-board') {
        this.viewerType = 'board-view'
      } else if (this.refTypeLive === 'peer-modules') {
        this.viewerType = 'module-view'
      }
      return this.viewerType
    }
  }
}
</script>

<style>
#refcontract-summary {
  display: grid;
  grid-template-columns: 1fr;
}

.ref-wrapper {
  border: 1px solid grey;
  margin: 1em;
  list-style-type: none;
}

.refname {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  margin-bottom: .5em;
}

.refinfo-col1 {
  justify-self: end;
  color: grey;
}

.refinfo-col2 {
  justify-self: start;
  margin-left: 1em;
}

.ref-description {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: .2em;
}

.cnrl-element {
  display: inline-block;
  margin-bottom: 1em;
}

#date-format {
  font-size: 0.6em;
}

#datatype-slot {
  margin: 1em;
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

#visualise-slot header {
  text-align: left;
  margin-left: 2em;
}

#visualise-slot ul li {
  text-align: left;
  margin-left: 2em;
  list-style-type: none;
}

.vis-type {
  display: inline;
  width: 200px;
  font-weight: bold;
}

.vis-info {
  display: inline;
}
#goverannce-slot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1em;
}

.key-hash {
  margin-bottom: 1em;
}
</style>
