<template>
  <div id="newapi-view">
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
        <label for="api-add-source">Source Primary?</label>
        <select class="select-api-source" id="">Please select
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
      </li>
      <li class="api-form-item">
        <label for="api-add-scripting">Type of data store:</label>
        <select class="select-api-id" id="api-mapping-build">
          <option value="none" selected="">Please select</option>
          <option value="safeNetwork">SAFEnetwork</option>
          <option value="ipfs">IPFS</option>
          <option value="dat">DAT</option>
          <option value="rest">REST</option>
          <option value="grpc">gRPC</option>
          <option value="csv">CVS</option>
        </select>
      </li>
      <li class="api-form-item">
        <label for="add-code-name">Base address</label>
        <input type="text"  id="mapping-base-address" placeholder="https://" required />
      </li>
      <!-- <li class="api-form-item">
        <label for="add-table-name">Device address:</label>
        <input type="text"  id="mapping-device-address" placeholder="" required />
      </li> -->
      <li class="api-form-item">
        <label for="add-table-name">Datatype endpoint:</label>
        <input type="text"  id="mapping-endpoint-address" placeholder="" required />
      </li>
      <li class="api-form-item">
        <a href='#' id="add-newendpoint">Add another endpoint</a>
      </li>
      <describe-data></describe-data>
    </ul>
  </div>
</template>

<script>
import DescribeData from '@/components/contribute/forms/describeData.vue'

export default {
  name: 'package-form',
  components: {
    DescribeData
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
