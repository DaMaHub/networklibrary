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
        <div id="file-preview">
          <label class="text-reader">
            Read file
            <input type="file" @change="loadTextFromFile">
          </label>
        </div>
        <div id="summary-content">
          <ul v-for="(value, index) in linesLimit" :key="value.id">
            <li>{{index }} {{ value }}</li>
          </ul>
        </div>
        <div id="convert-data">
          <form>
            <label for="linenumber">Please enter colum name line number</label>
            <input type="text" value="line number" v-model="lineBundle.cnumber">
            <label for="linenumber">Data start line</label>
            <input type="text" value="line number" v-model="lineBundle.dataline">
            <label for="linenumber">Please enter seperator type</label>
            <input type="text" value="comma, tab etc" v-model="lineBundle.delimiter">
          </form>
          <button @click='convertJSON'>Convert to JSON & SAVE</button>
        </div>
        <div id="feedback-save">
          save status {{ fileStatus }}
        </div>
        <div id="keypw-feedback">
          {{ verifyfeedbackM }}
        </div>
      </template>
    </source-modal>
  </div>
</template>

<script>
import SourceModal from '@/components/source/sourceModal.vue'

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
      numberc: 0,
      dataline: 0,
      delimiter: ''
    },
    fileinputSeen: true,
    fileData: {},
    fileName: '',
    filepath: '',
    fileType: '',
    fileSummary: '',
    linesLimit: [],
    verifyfeedbackM: '',
    feedbackM: '',
    warningM: ''
  }),
  methods: {
    loadTextFromFile (ev) {
      // prompt for Password
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
    },
    convertJSON () {
      // need to do this via peer peerLink
      const fileBund = {}
      fileBund.name = this.fileName
      fileBund.path = this.filepath
      fileBund.type = this.fileType
      fileBund.info = this.lineBundle
      this.$store.dispatch('actionFileconvert', fileBund)
    },
    closeSourceModal () {
      // this.sourceButton.active = !this.sourceButton.active
      this.$emit('closeSModal')
    }
  }
}
</script>

<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button looking */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
