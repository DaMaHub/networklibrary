<template>
  <div id="dashboard-holder">
    <div id="module-toolbar">
      <header>Dashboard</header>
      <!-- <button @click='decreaseWidth'>Decrease Width</button>
      <button @click='increaseWidth'>Increase Width</button> -->
      <button @click='addItem'>Add an item</button>
      <input type='checkbox' v-model='draggable'/> Draggable
      <input type='checkbox' v-model='resizable'/> Resizable
      <br/> <!-- @changes="updateLayout"  -->
    </div>
    <div class="grid-section">
        <grid-layout v-if="localGrid"
                     :layout='localGrid'
                     :col-num='12'
                     :row-height='30'
                     :is-draggable='draggable'
                     :is-resizable='resizable'
                     :vertical-compact='false'
                     :use-css-transforms='false'
        >
          <grid-item v-for='item in localGrid' :key='item.id'
                     :static='item.static'
                     :x='item.x'
                     :y='item.y'
                     :w='item.w'
                     :h='item.h'
                     :i='item.i'
                  >
              <!-- <span class='text'>box{{itemTitle(item)}}</span> -->
              {{ item.i }} -- {{ moduleData[item.i].type }}
              <component v-bind:is="moduleData[item.i].type" :mData="item.i"></component>
          </grid-item>
        </grid-layout>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
import SourceBuilder from '@/components/references/sourceBuilder.vue'
import ReferenceBuilder from '@/components/references/referenceBuilder.vue'

export default {
  name: 'visual-dashview',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    SourceBuilder,
    ReferenceBuilder
  },
  props: {
  },
  computed: {
    moduleData: function () {
      return this.$store.state.referenceData
    },
    ...mapState(['dashboardGrid']),
    storeGrid () {
      return _.cloneDeep(this.$store.state.dashboardGrid)
    },
    socketLive: function () {
      return this.$store.state.peersocket.socket.message
    }
  },
  watch: {
    storeGrid (newValue) {
      this.localGrid = newValue
    }
  },
  data () {
    return {
      moduleType: 'library-dashboard',
      localGrid: _.cloneDeep(this.$store.state.dashboardGrid),
      draggable: false,
      resizable: false,
      index: 0,
      peerLinklive: ''
    }
  },
  beforeMount () {
    this.$options.sockets.onmessage = (msg) => {
      // this.$store.dispatch('actionSocketMessage', msg.data)
    }
  },
  created () {
    // this.sendMessage('peer Netwokr LIbrary')
  },
  mounted () {
  },
  methods: {
    closeModule () {
      console.log('close module')
    },
    ...mapActions(['actionLocalGrid']),
    itemTitle (item) {
      var result = item.i
      if (item.static) {
        result += ' - Static'
      }
      return result
    },
    /*
    increaseWidth: function (item) {
        var width = document.getElementById('content').offsetWidth;
        width += 20;
        document.getElementById('content').style.width = width+'px';
    },
    decreaseWidth: function (item) {

        var width = document.getElementById('content').offsetWidth;
        width -= 20;
        document.getElementById('content').style.width = width+'px';
    },
    removeItem: function(item) {
        //console.log('### REMOVE ' + item.i);
        this.layout.splice(this.layout.indexOf(item), 1);
    }, */
    addItem () {
      // console.log('### LENGTH: ' + this.layout.length);
      var item = { x: 0, y: 0, w: 2, h: 2, i: this.index + '', whatever: 'bbb' }
      this.index++
      this.moduleContent.push(item)
      // this.$store.dispatch('actionGrideupdateItem', item)
    }
  }
}
</script>

<style>
#dashboard-holder {
  border: 0px solid red;
  min-height: 900px;
}

#module-toolbar {
  border: 0px solid blue;
}
header {
  margin-bottom: 12px;
  font-weight: bold;
}

.grid-section {
  border: 1px solid orange;
  height: auto;
}

.vue-grid-layout {
    border: 0px solid black;
    background: #eee;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

.vue-grid-item {
  height: fit-content;
  transform: none;
  margin-bottom:10px;
}

/*.vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
}*/

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 0px solid red;
}

.vue-grid-item.resizing {
    opacity: 1;
}

.vue-grid-item.static {
    background: #E9EDF0;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}

#dash-modules ul {
  border: 1px solid grey;
  margin: 1em;
  list-style: none;
}
</style>
