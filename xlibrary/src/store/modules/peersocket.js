import Vue from 'vue'
export default {
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  getters: {
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      this.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      console.log('massage bacik wss')
      console.log(message.data)
      state.socket.message = message.data
    }
  },
  actions: {
    sendMessage (context, message) {
      console.log('action send for ws')
      Vue.prototype.$socket.send(message)
      // this.commit('SOCKET_ONMESSAGE')
    },
    actionSocketMessage (context, message) {
      console.log('action for ws')
      this.commit('SOCKET_ONMESSAGE', message)
    }
  }
}
