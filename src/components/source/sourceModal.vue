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
            Source data
          </slot>
        </header>
        <div id="network-status-space">
          <slot name="source-file">
            Data file stype source upload
          </slot>
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
    /* background-color: rgba(0, 0, 0, 0.3); */
    display: flex;
    justify-content: left;
    /* align-items: center; */
    z-index: 12;
    overflow: scroll;
    width: 50%;
    margin-left: 2em;
  }

.modal {
  background: #FFFFFF;
  /* box-shadow: 2px 2px 20px 1px; */
  overflow-x: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: 90%;
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

</style>
