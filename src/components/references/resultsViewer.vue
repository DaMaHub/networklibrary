<template>
  <div id="module-referencecontract">
    <header
      class="viewer-header"
      id="modalTitle"
    >
      <slot name="header">
        This is a peer results
      </slot>
    </header>
    <section
      class="board-body"
      id="refcdescription"
    >
      <slot name="body">
        Peer results index and data
      </slot>
    </section>
    <footer class="board-footer">
      <slot name="footer">
        -
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'results-peer',
  components: {
  },
  computed: {
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
