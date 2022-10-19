import Vue from 'vue'
import VCalendar from 'v-calendar'
import { createPinia, PiniaVuePlugin } from 'pinia'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { Plotly } from 'vue-plotly'

Vue.config.productionTip = false
Vue.use(PiniaVuePlugin)
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})
Vue.use(Plotly)

const pinia = createPinia()

new Vue({
  router,
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')
