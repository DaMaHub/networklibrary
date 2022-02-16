import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false
// 127.0.0.1:9888
Vue.use(VueNativeSock, 'wss://wapird.healthscience.network', {
  store: store,
  // format: 'json',
  reconnection: true,
  reconnectionAttempts: 5000,
  reconnectionDelay: 300
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
