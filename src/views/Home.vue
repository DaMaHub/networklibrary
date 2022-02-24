<template>
  <div class="home">
    <div class="library-info" id="library-introduction">
    </div>
    <library-dashboard></library-dashboard>
  </div>
</template>

<script>
import LibraryDashboard from '@/components/library/dashboard.vue'

export default {
  name: 'Home',
  components: {
    LibraryDashboard
  },
  data () {
    return {
      pluginNL: true
    }
  }
}
</script>
