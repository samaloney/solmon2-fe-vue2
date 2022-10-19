import axios from 'axios'
import { defineStore, mapActions, mapState } from 'pinia'
import camelcaseKeys from 'camelcase-keys'

interface FDImage {
  createdAt: string
  dateObs: string
  dateQuery: string
  imagePath: string
  instrument: string
  level: string
  observable: string
  thumbnailPath: string
  updatedAt: string
  url: string
  wavelength: number
}

interface ARImage extends FDImage {
  noaaNo: number
}

export const useImageStore = defineStore('images', {
  state: () => ({
    fd_images: [] as FDImage[],
    ar_images: [] as ARImage[]
  }),
  getters: {
    getImages: (state) => state.fd_images
  },
  actions: {
    async fetchImages (query: string) {
      try {
        console.log('images/full_disk?time=' + query)
        console.log(this.fd_images)
        const fullDisk = await axios.get('images/full_disk?time=' + query, {
          transformResponse: [
            (data) => {
              return camelcaseKeys(JSON.parse(data), { deep: true })
            }
          ]
        })
        const ars = await axios.get('images/active_regions?time=' + query, {
          transformResponse: [
            (data) => {
              return camelcaseKeys(JSON.parse(data), { deep: true })
            }
          ]
        })
        this.fd_images = fullDisk.data
        this.ar_images = ars.data
        console.log(ars.data)
        console.log(this.fd_images.length)
        console.log(this.ar_images.length)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default {
  computed: {
    // ...mapStores(useImageStore),
    ...mapState(useImageStore, ['fd_images']),
    ...mapState(useImageStore, ['ar_images'])
  },
  methods: {
    ...mapActions(useImageStore, ['fetchImages'])
  }
}
