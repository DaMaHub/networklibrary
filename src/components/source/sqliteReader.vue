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
        <div id="file-container">
          <header>FILE CONTENT</header>
          <div class="file-section">
            <label class="file-select">Read file</label>
            <input type="file" @change="loadTextFromFile">
          </div>
          <div class="file-section">
            <label class="file-select">or enter url location:</label>
          </div>
          <div class="file-section" id="web-file-path">
            <input type="text" v-model="readRemotefile">
            <button @click="getRemotefile">read url file</button>
          </div>
          <div class="file-section" id="sf">
            <ul v-for="(value, index) in linesLimit" :key="value.id">
              <li><b>{{index }}</b> {{ value }}</li>
            </ul>
          </div>
          <div class="convert-section" id="convert-data">
            <button class="convert-button" @click='saveSQLite'>SAVE TO LIBRARY</button>
            <div id="feedback-save">
              <div id="file-save-feedback" v-if="fileStatus === true">
                <div class="file-feedback-info">
                  Conversion and save successful
                </div>
                <div>
                  File save info:
                  <div class="file-feedback-summary">
                    <div class="file-detail-info">
                      PATH:
                    </div>
                    <div class="file-detail-data">
                      {{ fileFeedback.path }}
                    </div>
                  </div>
                  <div class="file-feedback-summary">
                    <div class="file-detail-info">
                      COLUMNS:
                    </div>
                    <div class="file-detail-data">
                      {{ fileFeedback.columns }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    lineCounter: 0,
    lineBundle:
    {
      cnumber: '',
      dataline: '',
      delimiter: '',
      datetype: ''
    },
    fileinputSeen: true,
    fileData: {},
    fileName: '',
    filepath: '',
    fileType: '',
    fileSummary: '',
    linesLimit: [],
    feedbackM: '',
    warningM: '',
    readRemotefile: '',
    sourceLocation: ''
  }),
  methods: {
    loadTextFromFile (ev) {
      // prompt for Password
      this.sourceLocation = 'local'
      const localthis = this
      this.fileData = ev.target.files[0]
      this.fileName = this.fileData.name
      this.filepath = this.fileData.path
      this.fileType = 'sqlite'
      const reader = new FileReader()
      reader.onloadend = function () {
        // const fileData = reader.result
      }
      reader.readAsText(this.fileData)
      const reader2 = new FileReader()
      reader2.readAsDataURL(this.fileData)
      reader2.onload = function (e) {
        console.log('path')
        console.log(e.target)
        localthis.filepath = e.target.result
      }
    },
    saveSQLite () {
      // need to do this via peer peerLink
      const fileBund = {}
      fileBund.name = this.fileName
      fileBund.source = this.sourceLocation
      fileBund.websource = this.readRemotefile
      fileBund.web = 'weblocal'
      fileBund.path = this.filepath
      fileBund.type = this.fileType
      fileBund.info = this.lineBundle
      console.log(fileBund)
      this.$store.dispatch('actionSQLiteSave', fileBund)
      this.$store.dispatch('actionSetfilename', this.fileName)
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
