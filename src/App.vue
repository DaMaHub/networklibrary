<template>
  <div id="app">
    <div id="nav" v-if="pluginNL === false">
      <router-link to="/">{{ $t('home') }}</router-link> |
      <router-link to="/about">{{ $t('about') }}</router-link>
      <div class="toolkit-settings">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="toolkit-settings" id="select-language">
        <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
          <a href="#" id="language-learn">{{ entry.title }}</a>
        </button>
      </div>
      <div class="toolkit-settings" id="help-info">
        <button type="button" class="btn" @click="showModal">
          {{ $t('help') }}
        </button>
      </div>
      <div class="toolkit-settings">
        <button type="button" v-bind:class="{ networklive: connectBut.active === true && authConnectStatus === true}" class="connect-network" @click="connectNetwork(connectBut)">{{ connectBut.text }}</button>
      </div>
      <network-status class="toolbar-top" msg="not connected"></network-status>
      <help-modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          {{ $t('help') }} for -- {{ helpContext }}
        </template>
        <template v-slot:body>
          {{ helpContext }} sections are:
          <div class="help-section">
            Custom content for page help button clicked
          </div>
          <div class="help-section">
            Preservation index calculated?
          </div>
          <div class="help-section">
            Where is the data stored?
          </div>
        </template>
      </help-modal>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NetworkStatus from '@/components/home/NetworkStatus.vue'
import HelpModal from '@/components/help/HelpModal.vue'

export default {
  name: 'vue-home',
  components: {
    NetworkStatus,
    HelpModal
  },
  computed: {
    connectBut: function () {
      return this.$store.state.networkConnection
    },
    authConnectStatus: function () {
      return this.$store.state.peerauthStatus
    }
  },
  data () {
    return {
      pluginNL: true,
      isModalVisible: false,
      helpContext: 'home',
      languages: [
        { flag: 'en', language: 'en', title: 'English' },
        { flag: 'zh', language: 'zh', title: '普通话' }, // 普通话
        { flag: 'jp', language: 'jp', title: '日本語' }
      ],
      statusCALE:
      {
        text: 'off',
        active: false
      }
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
      this.helpContext = this.$router.currentRoute.name
    },
    closeModal () {
      this.isModalVisible = false
    },
    changeLocale (locale) {
      this.$i18n.locale = locale
    },
    connectNetwork (typeConnect) {
      this.$store.dispatch('actionCheckConnect')
    },
    caleAIStatus () {
      if (this.statusCALE.active === false) {
        this.statusCALE.active = true
        this.statusCALE.text = 'off'
      } else {
        this.statusCALE.active = false
        this.statusCALE.text = 'ON'
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.toolkit-settings {
  float: right;
}

.toolbar-top {
  display: inline-block;
  padding-right: 10px;
}

img {
  width: 120px;
}

.help-section {
  margin: 4em;
  text-align: left;
}
</style>
