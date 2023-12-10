<template>
  <div id="file-system">
    <source-modal v-show="sourceActive === true" :saveMessage="fileStatus" @close="closeSourceModal">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        <button
          type="button"
          class="btn-green"
          @click="closeSourceModal"
          aria-label="Close modal"
        >
          Close
        </button>
      </template>
      <template v-slot:source-file>
        <div class="package-form-item">
          <label for="add-code-name">API address </label>
          <input type="text"  id="mapping-base-address" placeholder="https://" required @change="apibaseSave" @input="apibaseSave" @paste="apibaseSave" @keyup="apibaseSave" v-model="formData.baseaddress" />
        </div>
      </template>
    </source-modal>
  </div>
</template>

<script>
import SourceModal from '@/components/source/sourceModal.vue'
import axios from 'axios'

export default {
  name: 'fileupload-page',
  components: {
    SourceModal
  },
  props: {
    sourceType: String,
    sourceActive: Boolean,
    saveMessage: Boolean
  },
  created () {
  },
  mounted () {
  },
  computed: {
    fileStatus: function () {
      return this.$store.state.fileSaveStatus
    },
    fileFeedback: function () {
      return this.$store.state.fileFeedback
    }
  },
  data: () => ({
    sourceButton:
    {
      active: false,
      text: 'sourcebutton'
    },
    formData:
    {
      baseaddress: ''
    },
    feedbackM: ''
  }),
  methods: {
    apibaseSave () {
      this.$store.dispatch('actionRESTSave', this.formData)
    },
    getRemotefile () {
      this.sourceLocation = 'web'
      axios.get(this.readRemotefile)
        .then(function (response) {
          // handle success
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    },
    closeSourceModal () {
      // clear the feedback on close
      // this.$store.dispatch('actionClearFileFeeback', 'clear')
      this.$emit('closeSModal')
    }
  }
}
</script>

<style scoped>
#file-system {
  display: grid;
  grid-template-columns: 1fr;
}

#file-container {
  display: grid;
  grid-template-columns: 1fr;
}

.file-section {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 1em;
}

.file-section input {
  font-size: 1.2em;
  margin: 0 auto 1em auto;
}

.file-section input.web-path-file {
  width: 20em;
}

.file-select {
  font-size: 1.2em;
}

#web-file-path input {
  width: 30em;
}

#web-file-path button {
  width: 6em;
  margin: 0 auto 1em auto;
  font-size: 1.2em;
}

.url-remote-file {
  font-size: 1.2em;
  margin: 0 auto 1em auto;
  width: 8em;
  font-size: 1.2em;
}

form.file-info {
  font-size: 1.2em;
}

.file-info-label {
  display: grid;
  grid-template-columns: 1fr 1fr;
  line-height: 1.4em;
  margin-bottom: .5em;
}

.file-info-label label {
  justify-self: end;
  margin-right: 1em;
}

.file-info-label input {
  width: 40%;
}

.convert-button {
  margin: 1em;
  font-size: 1.2em;
}

#summary-content {
  height: 100px;
  overflow: scroll;
  background-color: lightgrey;
}

#feedback-save {
  display: grid;
  grid-template-columns: 1fr;
  border: 1px dashed orange;
  margin-bottom: 2em;
}

#file-save-feedback {
  display: grid;
  grid-template-columns: 1fr;
}

.file-feedback-info {
  padding-bottom: 1em;
}

.file-feedback-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 1em;
}

.file-detail-info {
  justify-self: end;
  margin-right: 1em;
}

.file-detail-data {
  justify-self: start;
  font-weight: bold;
}

</style>
