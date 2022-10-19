<template>
  <v-app app id="inspire">

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>SolarMonitor2</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-col>
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="seachDate"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="seachDate"
            @input="search"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-switch
      inset
      @change="toggleDarkMode"
      ></v-switch>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        app>
      <v-list>
        <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title>
            Home
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/ars">
          <v-list-item-content>
            <v-list-item-title>
              ARS
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-content>
            <v-list-item-title>
              About
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import imageStore from '@/stores/images'

export default Vue.extend({
  name: 'App',

  data: () => (
    {
      dateMenu: false,
      drawer: null,
      seachDate: null
    }
  ),
  methods: {
    toggleDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    async search (date: string) {
      this.dateMenu = false
      console.log(date)
      await imageStore.methods.fetchImages(date + 'T12:00:00')
      // const fullDisk = await axios.get('images/full_disk?time=2022-09-15T12%3A00%3A00')
    }
  }
})

</script>
