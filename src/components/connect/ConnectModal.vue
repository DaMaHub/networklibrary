<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Network Connection
          </slot>
        </header>
        <div id="connect-peerlink">
          <div id="form-submit">
            <slot name="submit-cloud">
              <!-- no default button -->
            </slot>
          </div>
          <form>
            <div id="form-title">
              <slot name="title-form">
                <!-- no default title for form -->
              </slot>
            </div>
            <div id="network-status-space">
              <slot name="connect-network">
                Connection status unknown
              </slot>
            </div>
            <div id="form-input">
              <slot name="input-form">
                <!-- No default input -->
              </slot>
            </div>
          </form>
        </div>
        <div id="peers-networks">
          <div id="warm-peers">
            <slot name="peers-warm">
              Peers or Groups Connected
            </slot>
          </div>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'connect-modal',
  computed: {
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 12;
    overflow: scroll;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top: 200px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

#network-status-space {
}

#form-input {
  display: block;
  margin: 1em;
}

#form-submit {
  display: block;
  margin-bottom: 1em;
}

#connect-peerlink {
  display: block;
  min-height: 200px;
}

#peers-networks {
  display: block;
  /* min-height: 200px;
  margin-top: 2em;
  padding-bottom: 2em; */
}

#warm-peers {
  display: block;
  min-height: 20px;
}

#cold-peers {
  display: block;
  min-height: 20px;
}

#key-management {
  display: block;
}

#replicate-library {
  display: block;
}
</style>
