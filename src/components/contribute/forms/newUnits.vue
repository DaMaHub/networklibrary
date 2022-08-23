<template>
  <div id="units-form-view">
    <ul>
      <li class="api-form-item">
        <span class="required_notification">All fields required</span>
      </li>
      <li class="api-form-item">
        <label for="api-add-name">Name:</label>
        <input id="api-mapping-name" placeholder="api mapping name" required="" type="text">
      </li>
      <li class="api-form-item">
        <label for="api-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" required="" id="api-mapping-description"></textarea>
      </li>
      <li class="api-form-item">
        <label for="api-add-source">Units Primary?</label>
        <select class="select-api-source" id="">Please select
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </li>
      <li class="api-form-item">
        <label for="api-add-name">Unit name:</label>
        <input id="units-code-name" placeholder="units" required="" type="text">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'compute-form',
  components: {
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
