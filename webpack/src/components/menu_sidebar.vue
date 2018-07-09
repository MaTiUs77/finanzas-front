<template>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="{path:item.path}"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            icon: 'home',
            title: 'Inicio',
            path: '/'
          }
        ]
      }
    },
    created: function () {
    },
    methods: {
    }
  }
</script>
