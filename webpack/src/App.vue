<template>
  <v-app>

    <!-- MENU DE NAVEGACION !-->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <user-sidebar />
      <v-divider/>
      <menu-sidebar />
    
    </v-navigation-drawer>
    <!-- FIN MENU DE NAVEGACION !-->

    <v-toolbar
      app
      :color="headerColor"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <!-- CONTENIDO DE NAVEGACION !-->
    <v-content>
      <router-view/>
    </v-content>
    <!-- FIN CONTENIDO DE NAVEGACION !-->

  </v-app>
</template>

<script>
  import MenuSidebar from './components/menu_sidebar'
  import UserSidebar from './components/user_sidebar'

  export default {
    components :{ MenuSidebar, UserSidebar },
    data () {
      return {
        title: 'Finanzas Personales',
        drawer: true,
        headerColor: 'primary'
      }
    },
    created () {
      this.headerColor = navigator.onLine ? 'primary' : 'black'
    },
    methods: {
    },
    name: 'App'
  }
</script>
