<template>
  <div id="token-system">
    <div id="token-verify" v-if="fileinputSeen">
      <label class="text-reader">
        Read token file
        <input type="file" @change="loadTextFromFile">
      </label>
    </div>
    <div id="keypw-feedback">
      {{ verifyfeedbackM }}
    </div>
    <div v-if="viewPkeybuttons" id="publickey-view">
      <button @click.prevent="viewPublickey" class="button is-primary">View publickey address</button>
      <button @click.prevent="viewtToken" class="button is-primary">View Token</button>
      {{ pubkeyView }}
      {{ tokenTView }}
    </div>
    <div id="pwinput-prompt" v-if="pwinputSeen">
      Please enter password
      <passwordk v-model="passwordk" :toggle="true" />
      <button @click.prevent="verifyToken" class="button is-primary">Verify key ownership</button>
    </div>
  </div>
</template>

<script>
import Passwordk from 'vue-password-strength-meter'
// import { sBus } from '../../main.js'

export default {
  name: 'unlockkey-page',
  components: {
    Passwordk
  },
  props: {
    viewPkey: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  data: () => ({
    keyObject: {},
    verifyfeedbackM: '',
    viewPkeybuttons: false,
    token: {},
    fileinputSeen: true,
    pwinputSeen: false,
    pubkeyView: '',
    tokenTView: '',
    passwordk: null,
    text: '',
    keybuttonseen: false,
    feedbackM: '',
    warningM: '',
    devices: []
  }),
  methods: {
    loadTextFromFile (ev) {
      // prompt for Password
      const localthis = this
      const file = ev.target.files[0]
      const reader = new FileReader()
      reader.onloadend = function () {
        const tJSONstring = reader.result
        const tokenJSON = JSON.parse(tJSONstring)
        // now use getter to store state
        localthis.token = tokenJSON
        localthis.$store.commit('setBoth', tokenJSON)
        localthis.verifyfeedbackM = 'Data token live'
        localthis.viewPkeybuttons = true
        const authBundle = {}
        authBundle.network = 'cloud'
        authBundle.settings = tokenJSON
        localthis.$store.dispatch('startconnectNSnetwork', authBundle)
        localthis.$emit('closeTreader')
      }
      reader.readAsText(file)
      // Specify a data directory (optional; defaults to ~/.ethereum)
      // var datadir = process.cwd()
      // this.tokenJSONy = (datadir)
    },
    verifyToken () {
      // verify token is of right structure TODO
    },
    viewPublickey () {
      this.pubkeyView = 'Publickey = ' + this.token.publickey
    },
    viewtToken () {
      this.tokenTView = 'TestToken = ' + this.token.token
    }
  }
}
</script>

<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button looking */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
