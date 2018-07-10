<template>
<div>
  <v-card color="grey lighten-3 ma-1"  @click.native="bottomSheet = true" v-if="!deleted">

    <v-bottom-sheet v-model="bottomSheet">
      <v-list>
        <v-subheader>{{item.concepto}}</v-subheader>
        <v-list-tile @click="startEdit(item)">
          <v-list-tile-avatar>
            <v-icon>edit</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Editar</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="startDelete(item)">
          <v-list-tile-avatar>
            <v-icon>delete</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Eliminar</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>

    <v-card-title>

      <v-flex xs8 text-xs-left>
        <div class="subheading">
          <v-icon color="indigo lighten-2" v-if="item.mode==='credito'">face</v-icon>
          {{item.concepto}}
        </div>
      </v-flex>

      <v-flex xs4 text-xs-right>
        <div class="headline">${{item.monto}}</div>
      </v-flex>

      <v-flex xs8 text-xs-left>
        <div class="subheading"><small>{{item.categoria.nombre}}</small></div>
      </v-flex>

      <v-flex xs4 text-xs-right>
        <div class="subheading">{{item.cuota_nro}}/{{item.cuotas}}</div>
      </v-flex>

    </v-card-title>
  </v-card>

  <!-- MODAL DE EDICION -->
  <v-dialog v-model="modalMovimiento" width="800px">
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">
        Editar  movimiento
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>

          <v-flex xs6>
            <v-combobox
                v-model="edit.categoria"
                :items="categorias"
                label="Categoria"
            ></v-combobox>
          </v-flex>

          <v-flex xs12>
            <v-text-field placeholder="Concepto" :value="item.concepto"></v-text-field>
          </v-flex>

          <v-flex xs6>
            <v-text-field placeholder="Categoria" :value="item.categoria.nombre"></v-text-field>
          </v-flex>

          <v-flex xs6>
            <v-text-field type="number" placeholder="Monto" :value="item.monto"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-switch label="En cuotas" v-model="modalMovimientoEnCuotas"></v-switch>
          </v-flex>

          <v-flex xs6 v-if="modalMovimientoEnCuotas">
            <v-text-field type="number" placeholder="Cuota actual" :value="item.cuota_nro"></v-text-field>
          </v-flex>
          <v-flex xs6 v-if="modalMovimientoEnCuotas">
            <v-text-field type="number" placeholder="Cuotas" :value="item.cuotas"></v-text-field>
          </v-flex>


        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat color="primary" @click="modalMovimiento = false">Cancelar</v-btn>
        <v-btn flat @click="modalMovimiento = false">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- SNACKBAR -->
  <v-snackbar v-model="deleteSnack">
    Eliminando...
  </v-snackbar>

</div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: ['item'],
    data () {
      return {
        deleted: false,
        deleteSnack: false,
        bottomSheet: false,
        modalMovimiento: false,
        modalMovimientoEnCuotas: false,

        edit: {
          categoria: null
        },
        categorias: [
          'Ocio',
          'Camioneta',
          'Nafta',
          'Comida'
        ]
      }
    },
    created: function () {
    },
    methods: {
      startEdit(item)
      {
        console.log(item);
        this.bottomSheet = false;
        this.modalMovimiento = true;
        this.modalMovimientoEnCuotas = false;

        if(item.cuota_nro>1)
        {
          this.modalMovimientoEnCuotas = true;
        }
      },
      startDelete(item)
      {
        var vm = this;
        console.log(item);

        vm.bottomSheet = false;
        vm.deleteSnack = true;

        axios({
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          url: process.env.API_INGRESS + '/api/movimiento/egreso/'+item.id})
          .then(function (response) {
            vm.deleteSnack = false;
            vm.deleted=true;
          })
          .catch(function (error) {
            vm.deleteSnack = false;
          });
      }
    }
  }
</script>
