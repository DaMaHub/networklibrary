<template>
  <div class="network-connectstatus">
    <connect-modal v-show="connectBut.active === true" @close="closeModal">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        <button
          type="button"
          class="btn-green"
          @click="closeModal"
          aria-label="Close modal"
        >
          Close
        </button>
        CONNECT <a href="#" id="disconnect-network" @click="disconnectNetwork">Disconnect</a>
      </template>
      <template v-slot:title-form>
        <header class="connect-info">DaMaHub Network Library</header>
      </template>
      <template v-slot:connect-network>
        <div id="network-status">
          <div class="status-info">
            Connection Status: <div class="hon-square-status" v-bind:class="{ active: connectNetworkstatus === true && peerauth === true }"></div>
          </div>
          <div class="status-info">
            Warm peers connected: {{ warmPeers.length }}
          </div>
        </div>
      </template>
      <template v-slot:input-form>
        <div id="external-datastores">
          <header class="connect-info">External data source connections</header>
          <div class="external-token-status">
            <header>REST</header>
            <div id="self-in" v-if="peerauth === true">
              <!-- <input v-model="secretPeer" placeholder="public key">
              <input v-model="passwordPeer" placeholder="token"> -->
            </div>
          </div>
          <div class="external-token-status">
            <header>SQLite</header>
              <p>Gadgetbridge</p>
          </div>
        </div>
      </template>
      <template v-slot:submit-cloud v-if="cloudConnect === 'signin-cloud' && peerauth === false">
        <form id="cloud-signin-form" >
          <div class="cloud-inputs">
            <label class="form-couple-type" for="signin-cloud">username</label>
            <input class="form-couple" type="text" id="usernamecloud" name="username" v-model="cloudsigninInput">
          </div>
          <div class="cloud-inputs">
            <label class="form-couple-type" for="password-cloud">password</label>
            <input class="form-couple" type="password" id="passwordcloud" name="password" v-model="cloudpwInput">
          </div>
          <div class="cloud-confirm">
            <button id="cloud-submit" @click.prevent="submitCloudin">
              Sign-in
            </button>
          </div>
        </form>
      </template>
      <template v-slot:peers-warm>
        <connection-lists></connection-lists>
      </template>
    </connect-modal>
  </div>
</template>

<script>
import ConnectModal from '@/components/connect/ConnectModal.vue'
import ConnectionLists from '@/components/connect/connectionLists.vue'
// const remote = require('electron').remote

export default {
  name: 'Network-Connect',
  components: {
    ConnectModal,
    ConnectionLists
  },
  computed: {
    connectBut: function () {
      return this.$store.state.networkConnection
    },
    connectNetworkstatus: function () {
      return this.$store.state.connectStatus
    },
    peerauth: function () {
      return this.$store.state.peerauthStatus
    },
    connectContext: function () {
      return this.$store.state.connectContext
    },
    warmPeers: function () {
      return this.$store.state.warmNetwork
    }
  },
  props: {
    msg: String
  },
  data () {
    return {
      // w: remote.getCurrentWindow(),
      isModalVisible: false,
      buttonName: 'verify token',
      cloudConnect: 'signin-cloud', // 'signin-cloud',
      cloudsigninInput: '',
      cloudpwInput: ''
    }
  },
  methods: {
    disconnectNetwork () {
      // close peerLINK
      this.$store.dispatch('actionDisconnect')
      // close electron / webapp
      this.w.close()
    },
    closeModal () {
      this.$store.dispatch('actionCloseNetworkModal')
    },
    submitCloudin () {
      const peerConnect = {}
      peerConnect.peer = this.cloudsigninInput
      peerConnect.password = this.cloudpwInput
      this.$store.dispatch('actionCloudSignin', peerConnect)
      this.cloudsigninInput = ''
      this.cloudpwInput = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.network-connectstatus {
}

#network-status {
  display: block;
  border-bottom: 1px solid lightgrey;
  padding: .5em;
  font-size: 1.4em;
}

.status-info {
  display: block;
  margin-left: 30px;
  padding-top: 1em;
}

.hon-square-status {
  display: inline-block;
  border: 1px solid grey;
  width: 40px;
  height: 20px;
  background-color: red;
}

.hon-square-status.active {
  display: inline-block;
  border: 1px solid grey;
  width: 40px;
  height: 20px;
  background-color: green;
}

#cloud-signin-form {
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid red
}

.cloud-inputs {
  display: grid;
  grid-template-columns: 200px 400px;
  grid-gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 1em;
  font-size: 1.2em;
}

.form-couple-type {
  justify-self: end;
}
.cloud-confirm {
  display: grid;
  align-items: center;
  justify-content: center;
}

#cloud-submit {
  width: 200px;
  padding: 1em;
}

#external-datastores {
  display: block;
  border-bottom: 1px solid grey;
}

.external-token-status {
  display: block;
}

.local-sqlite {
  display: block;
}

.connect-info {
  padding-bottom: 1.2em;
  font-size: 1.4em;
  font-weight: bold;
}

.network-state {
  display: inline-block;
}

.peer-list-set {
  font-size: 1.4em;
}

.peer-ledgers {
  font-size: 1.4em;
}

.btn {
  font-size: 1.2em;
}

#disconnect-network {
  color: red;
}

.reset {
  clear: both;
}

</style>
