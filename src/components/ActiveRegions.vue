<template>
  <v-container class="d-flex flex-wrap">
    <v-tabs-slider></v-tabs-slider>
    <v-tabs
        v-model="tab"
        background-color="primary"
        dark
        show-arrows
      >
      <v-tab
        v-for="num in getArNumbers"
        :key="num"
      >
        {{ num }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="num in getArNumbers" :key="num">
        <v-row>
        <v-col class="col-md-3" v-for="(fd, i) in getArByNum(num)" :key="i">
          <v-img
            :class="{'v-image__image_dark': $vuetify.theme.dark}"
            :src="`${fd.thumbnailPath}`"
            content-class="rev-image">
            <template v-slot:placeholder>
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </template>
          </v-img>
        </v-col>
      </v-row>
      </v-tab-item>
  </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { useImageStore } from '@/stores/images'
import { mapState } from 'pinia'

export default Vue.extend({
  name: 'ActiveRegions',

  computed: {
    ...mapState(useImageStore, ['ar_images']),
    getArNumbers () {
      const unique = [...new Set(this.ar_images.map(item => item.noaaNo))]
      console.log(unique)
      return unique
    }
  },
  methods: {
    getArByNum (num: number) {
      console.log(num)
      const res = this.ar_images.filter((data) => data.noaaNo === num)
      console.log(res)
      return res
    }
  },
  data: () => ({
    tab: null
  })
})
</script>

<style>
.v-image__image_dark {
  background-position: center center;
  filter: invert(1);
}
</style>
