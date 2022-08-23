<template>
  <div id="describe-authorisation">
    <div class="auth-info">
      <label for="auth-store">Authorise access:</label>
      <input type="text"  id="auth-access-token" placeholder="" required @change="authtokenSave" @input="authtokenSave" @paste="authtokenSave" @keyup="authtokenSave" v-model="formData.authorisation"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'describe-auth',
  components: {
  },
  props: {
    formData: {
      type: Object
    }
  },
  computed: {
  },
  data: () => ({
  }),
  methods: {
    authtokenSave () {
      this.$store.dispatch('actionSaveAuth', '')
    }
  }
}
</script>

<style>
#describe-authorisation {
  display: grid;
  grid-template-columns: 1fr;
  border-top: 2px solid lightgrey;
  padding-top: 2em;
  border-bottom: 2px solid lightgrey;
  padding-bottom: 2em;
}

.auth-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.auth-info label {
  border: 1px solid red;
}
</style>
