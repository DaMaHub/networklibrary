<template>
  <div id="describe-device">
    <div class="device-info">
      <label for="tidy">Device name</label>
      <input type="text" v-model="deviceForm.name">
    </div>
    <div class="device-info">
      <label for="tidy">MAC address</label>
      <input type="text" v-model="deviceForm.mac_address">
    </div>
    <div class="device-info">
      <label for="tidy">Location Lat Long</label>
      <input type="text" v-model="deviceForm.location_lat">
    </div>
    <div class="device-info">
      <label for="tidy">Location Long</label>
      <input type="text" v-model="deviceForm.location_long">
    </div>
  </div>
</template>

<script>
export default {
  name: 'describe-device',
  components: {
  },
  props: {
  },
  computed: {
  },
  data: () => ({
    deviceForm:
    {
      name: '',
      mac_address: '',
      location_lat: '',
      location_long: '',
      firmware: '',
      mobileapp: ''
    }
  }),
  methods: {
    saveDeviceInfo () {
      this.$store.dispatch('actionSaveDevice', this.deviceForm)
    }
  }
}
</script>

<style>
#describe-device {
  display: grid;
  grid-template-columns: 1fr;
  border-top: 2px solid lightgrey;
  padding-top: 2em;
  border-bottom: 2px solid lightgrey;
  padding-bottom: 2em;
}

.device-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: .4em;
}

.device-info label {
  border: 0px solid red;
  margin-right: 1em;
  justify-self: end;
  padding-bottom: .4em;
}
</style>
