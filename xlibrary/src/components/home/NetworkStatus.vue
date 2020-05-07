<template>
  <div class="hello">
    <header>Network Status</header>
    <div id="connection-status">{{ msg }}</div>
    <button type="button" class="btn" @click="connectNetwork('connect')">Connect</button>
    <button type="button" class="btn" @click="connectNetwork('new-connect')">New account</button>
    <button type="button" class="btn" @click="connectNetwork('self-connect')">Self sign-in</button>
    <button type="button" class="btn" @click="connectNetwork('self-testnetwork')">Testnetwork sign-in</button>
    <connect-modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        CONNECT
      </template>
      <template v-slot:title-form>
        {{ connectContext.message }}
      </template>
      <template v-slot:input-form>
        <token-reader v-if="connectContext.type === 'testnetwork'" @closeTreader="closeModal"></token-reader>
        <div id="self-in" v-if="connectContext.type === 'selfsign'">
          <input v-model="secretPeer" placeholder="public key">
          <input v-model="passwordPeer" placeholder="token">
        </div>
      </template>
      <template v-slot:submit-form>
        <button>{{ buttonName }}</button>
      </template>
    </connect-modal>
  </div>
</template>

<script>
import ConnectModal from '@/components/connect/ConnectModal.vue'
import TokenReader from '@/components/connect/token-reader.vue'

export default {
  name: 'Network-Connect',
  components: {
    ConnectModal,
    TokenReader
  },
  props: {
    msg: String
  },
  data () {
    return {
      isModalVisible: false,
      connectContext:
      {
        type: '',
        message: '',
        footer: ''
      },
      buttonName: 'Connect',
      secretPeer: '',
      passwordPeer: ''
    }
  },
  methods: {
    connectNetwork (typeConnect) {
      this.isModalVisible = true
      if (typeConnect === 'connect') {
        this.connectContext.type = 'connect'
        this.connectContext.message = 'Anno. connect to network'
        this.buttonName = 'Annon. connect'
        this.$store.dispatch('annonconnectNSnetwork')
      } else if (typeConnect === 'new-connect') {
        this.connectContext.type = 'firsttime'
        this.connectContext.message = 'first time new connection setup'
        this.buttonName = 'Submit'
      } else if (typeConnect === 'self-connect') {
        this.connectContext.type = 'selfsign'
        this.connectContext.message = 'Self sign-in'
        this.buttonName = 'Self Sign-in'
      } else if (typeConnect === 'self-testnetwork') {
        this.connectContext.type = 'testnetwork'
        this.connectContext.message = 'TestNetwork'
        this.buttonName = ''
      }
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
