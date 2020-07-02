<template>
  <div id="datatype-referencecontract">
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
        Datatype Reference Contract Info
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
  name: 'datatype-refcontract',
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
#datatype-referencecontract {
  text-align: center;
  background-color: #e6ffff;
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
