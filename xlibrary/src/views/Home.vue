<template>
  <div class="home">
    xLibrary
    <div class="library-info" id="library-introduction">
      <NetworkStatus msg="not connected"></NetworkStatus>
    </div>
    <library-dashboard></library-dashboard>
  </div>
</template>

<script>
import NetworkStatus from '@/components/home/NetworkStatus.vue'
import LibraryDashboard from '@/components/library/dashboard.vue'

export default {
  name: 'Home',
  components: {
    NetworkStatus,
    LibraryDashboard
  }
}
</script>
