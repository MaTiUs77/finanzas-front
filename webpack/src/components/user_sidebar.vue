<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="@/assets/nophoto.png" >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    created: function () {
    },
    methods: {
    },
    computed: {
      user() {
        return store.state.user;
      }
    }
  }
</script>
