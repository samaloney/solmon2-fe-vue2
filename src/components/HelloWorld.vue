<template>
  <v-container class="d-flex flex-wrap">
    <v-row>
      <v-col class="col-md-3" v-for="(fd, i) in fd_images" :key="i">
        <v-img :src="`${fd.thumbnailPath}`">
          <template v-slot:placeholder>
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { useImageStore } from '@/stores/images'
import { mapState } from 'pinia'

export default Vue.extend({
  name: 'HelloWorld',

  computed: {
    ...mapState(useImageStore, ['fd_images'])
  },
  data: () => ({

  })
})
</script>
