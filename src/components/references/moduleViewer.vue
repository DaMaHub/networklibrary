<template>
  <div id="module-referencecontract">
    <header
      class="viewer-header"
      id="modalTitle"
    >
      <slot name="header">
        This is the default tile!
      </slot>
    </header>
    <section
      class="board-body"
      id="refcdescription"
    >
      <slot name="body">
        module Reference Contract Info
      </slot>
    </section>
    <footer class="board-footer">
      <slot name="footer">
        Close
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'module-refcontract',
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

<style>
#module-referencecontract {
  text-align: center;
  background-color: #e6e6ff;
}

.viewer-header {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
}

.board-body {
  font-size: 1.4em;
}

</style>
