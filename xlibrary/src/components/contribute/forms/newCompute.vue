<template>
  <div id="compute-form-view">
    <ul>
      <li class="compute-form-item">
        <span class="required_notification">All fields required</span>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-name">Name:</label>
        <input id="compute-mapping-name" placeholder="compute mapping name" required="" type="text">
      </li>
      <li class="compute-form-item">
        <label for="compute-add-description">Description:</label>
        <textarea name="message" cols="40" rows="6" required="" id="compute-mapping-description"></textarea>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-source">Compute Primary?</label>
        <select class="select-compute-source" id="">Please select
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </li>
      <li class="compute-form-item">
        <label for="compute-add-name">location of code:</label>
        <input id="compute-code-name" placeholder="compute code" required="" type="text">
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

<style>

</style>
