<template>
  <div>
    <v-btn
            fab
            bottom
            right
            color="indigo"
            dark
            fixed
            @click.stop="modalMovimiento = !modalMovimiento"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="modalMovimiento" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          Editar  movimiento
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>

            <v-flex xs12>
              <v-text-field placeholder="Concepto"></v-text-field>
            </v-flex>

            <v-flex xs6>
              <v-text-field placeholder="Categoria"></v-text-field>
            </v-flex>

            <v-flex xs6>
              <v-text-field type="number" placeholder="Monto"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-switch label="En cuotas" v-model="modalMovimientoEnCuotas"></v-switch>
            </v-flex>

            <v-flex xs6 v-if="modalMovimientoEnCuotas">
              <v-text-field type="number" placeholder="Cuota actual"></v-text-field>
            </v-flex>
            <v-flex xs6 v-if="modalMovimientoEnCuotas">
              <v-text-field type="number" placeholder="Cuotas"></v-text-field>
            </v-flex>


          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary" @click="modalMovimiento = false">Cancelar</v-btn>
          <v-btn flat @click="modalMovimiento = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        modalMovimiento: false,
        modalMovimientoEnCuotas: false,
      }
    },
    created: function () {
    },
    methods: {
    }
  }
</script>
