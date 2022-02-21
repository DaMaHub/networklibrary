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
        <div id="file-container">file cotnent
          <div id="file-preview">
            <label class="text-reader">
              Read file
              <input type="file" @change="loadTextFromFile">
            </label>
          </div>
          <div id="file-url-preview">
            <label>
              or enter url location:
            </label>
            <input type="text" v-model="readRemotefile">
            <button class="url-remote-file" @click="getRemotefile">read url file</button>
          </div>
          <div id="summary-content">
            <ul v-for="(value, index) in linesLimit" :key="value.id">
              <li>{{index }} {{ value }}</li>
            </ul>
          </div>
          <div id="convert-data" v-if="linesLimit.length > 0">
            <form class="file-info">
              Please enter:
              <div class="file-info-label">
                <label for="linenumber">column names line number</label>
                <input type="text" value="" v-model="lineBundle.cnumber">
              </div>
              <div class="file-info-label">
                <label for="dataline">Data start line number</label>
                <input type="text" value="" v-model="lineBundle.dataline">
              </div>
              <div class="file-info-label">
                <label for="seperator">Seperator type</label>
                <input type="text" value="" placeholder="comma tab other" v-model="lineBundle.delimiter">
              </div>
              <div class="file-info-label">
                <label for="datetype">Type of date</label>
                <input type="text" value="" v-model="lineBundle.datetype">
              </div>
            </form>
            <button class="convert-button" @click='convertJSON'>Convert to JSON & SAVE</button>
            <div id="feedback-save">
                <div id="file-save-feedback" v-if="fileStatus === true">
                  <div class="file-feedback">
                    Conversion and save successful
                  </div>
                  <div>
                    File save info:
                    <div class="feedback-info-package">
                      PATH: {{ fileFeedback.path }}
                    </div>
                    <div class="feedback-info-package">
                      COLUMNS: {{ fileFeedback.columns }}
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
      this.fileType = this.fileData.type
      const reader = new FileReader()
      reader.onloadend = function () {
        // const fileData = reader.result
        const lines = reader.result.split(/\r\n|\n/)
        localthis.linesLimit = lines.slice(0, 30)
        /* function limit (string = '', limit = 0) {
          return string.substring(0, limit)
        }
        const shortText = limit(fileData, 3000)
        localthis.fileSummary = shortText */
      }
      reader.readAsText(this.fileData)
      const reader2 = new FileReader()
      reader2.readAsDataURL(this.fileData)
      reader2.onload = function (e) {
        localthis.filepath = e.target.result
      }
    },
    convertJSON () {
      // need to do this via peer peerLink
      const fileBund = {}
      fileBund.name = this.fileName
      fileBund.source = this.sourceLocation
      fileBund.websource = this.readRemotefile
      fileBund.web = 'weblocal'
      fileBund.path = this.filepath
      fileBund.type = this.fileType
      fileBund.info = this.lineBundle
      this.$store.dispatch('actionFileconvert', fileBund)
    },
    getRemotefile () {
      this.sourceLocation = 'web'
      const localthis = this
      axios.get(this.readRemotefile)
        .then(function (response) {
          // handle success
          // console.log(Object.keys(response))
          // console.log(response.data)
          const dataSource = response.data
          const lines = dataSource.split(/\r\n|\n/)
          localthis.linesLimit = lines.slice(0, 30)
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
      this.$store.dispatch('actionClearFileFeeback', 'clear')
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

#file-preview {
  display: grid;
  grid-template-columns: 1fr;
  border: 4px solid red;
}
.text-reader {
  display: grid;
  grid-template-columns: 1fr;
  /* Fancy button looking */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  z-index: -1;
  opacity: 0;
}

.file-info {
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.2em;
}

.file-info-label {
  border: 1px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.convert-button {
  margin: 1em;
  font-size: 1.2em;
}

.url-remote-file {
  font-size: 1.2em;
}

#file-container {
  display: grid;
  grid-template-columns: 1fr;
}

#summary-content {
  max-height: 60%;
  overflow: scroll;
}
</style>
