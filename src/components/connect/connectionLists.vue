<template>
  <div id="connection-lists">
    <div id="peer-social-network">
      <div id="tabs-component">
        <div class="spacer-component-tab"></div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'peers' }"
          v-on:click="selectTab('peers')"
        >
          Peers
        </div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'datastores' }"
          v-on:click="selectTab('datastores')"
        >
          Datastores
        </div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'ai' }"
          v-on:click="selectTab('ai')"
        >
          AI
        </div>
        <div
          class="grid-component-tab" v-bind:class="{ active: listContext === 'wallets' }"
          v-on:click="selectTab('wallets')"
        >
          Wallet
        </div>
        <div class="spacer-component-tab"></div>
      </div>
      <div id="list-content">
        <div class="list-space" id="peer-list" v-if="listContext === 'peers'">
          <button type="button" class="btn" @click.prevent="addWarmpeer()">Add new</button>
          <div v-if="addWarm === true" id="add-warm-peer">
            <input v-model="newPeername" placeholder="name">
            <input v-model="newPeer" placeholder="public key">
            <ul v-if="replicateList.length > 0">
              <label for="datastore-select"></label>
              <select class="select-yaxis-id" id="datastore-select-rep" v-model="peerDStore">
                <option value="none" selected="">please select</option>
                <option v-for="ds in replicateList" :key="ds.id" v-bind:value="ds">
                {{ ds }}
                </option>
              </select>
            </ul>
            <button type="button" class="btn" @click="addWarmNetwork()">save</button>
          </div>
          <ul class="peer-list-set" v-for='peer in warmPeers' :key='peer.id'>
            <li>Peer {{ peer.datastore }} --- {{ peer.name }} --- {{ peer.publickey }}
              <!-- <button type="button" class="btn" @click="peerSyncLibrary(peer.publickey)">Replicate</button> -->
            </li>
          </ul>
        </div>
        <div class="list-space" id="ai-list" v-if="listContext === 'ai'">
          <div id="ai-peers">
          </div>
        </div>
        <div class="list-space" id="datastore-list" v-if="listContext === 'datastores'">
          <div id="peers-listkeys">
              <div v-if="swarmState === true" id="open-connect">Public Library OPEN for replication
              </div>
              <ul class="peer-ledgers" v-for='pk in publicKeysList' :key='pk.id'>
                <li>{{ pk.keyname }} pubkey- {{ pk.pubkey }}
                <!-- <button type="button" class="btn" @click="openReplication(pk)">sync</button> -->
                </li>
              </ul>
            </div>
            <div id="replicate-librarydatastore">
              <header>Network Library</header>
              Replicate library:
              <input v-model="peerSynckey" placeholder="public key">
              <button type="button" class="btn" @click="peerSyncLibrary()">Sync Library</button>
            </div>
        </div>
        <div class="list-space" id="wallet-list" v-if="listContext === 'wallets'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'list-connections',
  components: {
  },
  props: {
  },
  created () {
  },
  mounted () {
  },
  computed: {
    publicKeysList: function () {
      const displayKeys = []
      for (let keyi of this.$store.state.publickeys) {
        const keyInfo = {}
        const keyName = Object.keys(keyi)
        keyInfo.keyname = keyName[0]
        keyInfo.pubkey = keyi[keyInfo.keyname]
        displayKeys.push(keyInfo)
      }
      return displayKeys
    },
    publicKeysIndex: function () {
      return this.$store.state.publickeysIndex
    },
    warmPeers: function () {
      return this.$store.state.warmNetwork
    },
    swarmState: function () {
      return this.$store.state.swarmStatus
    }
  },
  data: () => ({
    tab:
    {
      isActive: false,
      isDisabled: true
    },
    listContext: 'peers',
    addWarm: false,
    newPeer: '',
    newPeername: '',
    secretPeer: '',
    passwordPeer: '',
    peerDStore: '',
    replicateList: ['peerlibrary', 'librarynetwork', 'resultspeer', 'kblpeer'],
    peerSynckey: ''
  }),
  methods: {
    selectTab (ls) {
      this.listContext = ls
    },
    addWarmpeer () {
      this.addWarm = !this.addWarm
    },
    addWarmNetwork () {
      let peerHolder = {}
      peerHolder.name = this.newPeername
      peerHolder.publickey = this.newPeer
      peerHolder.datastore = this.peerDStore
      const peerContract = {}
      peerContract.type = 'library'
      peerContract.reftype = 'peer-add'
      peerContract.action = 'PUT'
      peerContract.data = peerHolder
      const peerCJSON = JSON.stringify(peerContract)
      this.$store.dispatch('actionAddwarmPeer', peerCJSON)
      this.newPeername = ''
      this.newPeer = ''
      this.peerDStore = ''
      this.addWarm = false
    },
    openReplication (info) {
      console.log('open close replication for data store')
      console.log(info)
      this.$store.dispatch('actionOpenLibrary', info)
    },
    peerSyncLibrary (pubkey) {
      // pass on public key to peerlink and sync datastore for this peer
      this.$store.dispatch('actionPeersyncLibrary', pubkey)
    }
  }
}
</script>

<style scoped>
#tabs-component {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr;
}

.grid-component-tab {
  border-top: 2px solid grey;
  border-left: 2px solid grey;
  border-right: 2px solid grey;
  font-size: 1.2em;
  padding: 1em;
}

.grid-component-tab.active {
 background-color: lightgrey;
}

.is-disabled {
  background: white;
}

#list-content {
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  min-height: 240px;
  background-color: lightgrey;
  font-size: 1.2em;
}

.list-space {
  padding-top: 2em;
}
#peer-social-network {
  display: block;
  height: 100%;
  border-bottom: 1px solid grey;
  margin-top: 0px;
}

#peer-social-network header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}

#peers-listkeys {
  display: block;
  border-bottom: 1px solid grey;
}

#peers-listkeys header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}

#ai-peers {
  border-bottom: 1px solid grey;
}

#ai-peers header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}

#replicate-librarydatastore {
  display: block;
  border-bottom: 1px solid grey;
}

#replicate-librarydatastore header {
  font-size: 1.4em;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
