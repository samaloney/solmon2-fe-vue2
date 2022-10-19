<template>
  <Plotly :data="this.getData" :layout="this.layout" :display-mode-bar="true"/>
</template>

<script lang="ts">
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { defineComponent } from 'vue'
import { Plotly } from 'vue-plotly'

interface GOES {
  electronContaminaton: boolean
  electronCorrection: number
  energy: string
  flux: number
  observedClux: number
  satellite: number
  timeTag: string
}

export default defineComponent({
  components: {
    Plotly
  },
  data () {
    return {
      data: [],
      json: [] as GOES[],
      layout: {
        yaxis: {
          type: 'log',
          autotick: false,
          ticks: 'outside',
          tickformat: '~e',
          tickwidth: 4,
          tickcolor: '#000',
          title: 'Flux (W/m²)'
        }
      }
    }
  },
  computed: {
    getData () : unknown {
      const shortCh : GOES[] = this.json.filter((data : any) => (data.energy === '0.05-0.4nm'))
      const longCH : GOES[] = this.json.filter((data : any) => (data.energy === '0.1-0.8nm'))
      return [{
        x: shortCh.map(data => data.timeTag),
        y: shortCh.map(data => data.flux),
        type: 'line',
        marker: { color: 'red' },
        connectgaps: false,
        name: 'XRS Short'

      },
      {
        x: longCH.map(data => data.timeTag),
        y: longCH.map(data => data.flux),
        type: 'line',
        marker: { color: 'blue' },
        connectgaps: false,
        name: 'XRS Long'

      }]
    }
  },
  methods: {

  },
  async created () {
    const data = await axios.get<GOES[]>('https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json', {
      transformResponse: [
        (data) => { return camelcaseKeys(JSON.parse(data), { deep: true }) }
      ]
    }).then(response => response.data)
    this.json = data
  }
})
</script>
