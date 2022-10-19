<template>
  <ActiveRgions />
</template>

<script lang="ts">
import Vue from 'vue'
import ActiveRgions from '../components/ActiveRegions.vue'

export default Vue.extend({
  name: 'ARView',

  components: {
    ActiveRgions
  }
})
</script>
