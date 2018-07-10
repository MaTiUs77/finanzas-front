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
          Agregar movimiento
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>


            <v-flex xs12>
              <api-form v-model="movimiento.cuenta" :selected="movimiento.cuenta" form="cuentas" label="Cuenta"/>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="movimiento.concepto" placeholder="Concepto"></v-text-field>
            </v-flex>

            <v-flex xs6>
              <api-form v-model="movimiento.categoria" :selected="movimiento.categoria" form="categorias" label="Categoria"/>
            </v-flex>

            <v-flex xs6>
              <v-text-field v-model="movimiento.monto" type="number" placeholder="Monto"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-switch label="En cuotas" v-model="modalMovimientoEnCuotas"></v-switch>
            </v-flex>

            <v-flex xs6 v-if="modalMovimientoEnCuotas">
              <v-text-field v-model="movimiento.cuota_nro" type="number" placeholder="Cuota actual"></v-text-field>
            </v-flex>
            <v-flex xs6 v-if="modalMovimientoEnCuotas">
              <v-text-field v-model="movimiento.cuotas" type="number" placeholder="Cuotas"></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-dialog
                      ref="dialog_presentado_at"
                      :close-on-content-click="true"
                      v-model="picker.presentado_at"
                      :return-value.sync="movimiento.presentado_at"
                      persistent
                      lazy
                      full-width
                      min-width="290px"
              >
                <v-text-field
                        slot="activator"
                        v-model="movimiento.presentado_at"
                        label="Fecha de compra"
                        prepend-icon="event"
                        readonly
                ></v-text-field>
                <v-date-picker v-model="movimiento.presentado_at" @input="$refs.dialog_presentado_at.save(movimiento.presentado_at)"></v-date-picker>

              </v-dialog>
            </v-flex>

             <v-flex xs12 sm6 md4>
              <v-dialog
                      ref="dialog_periodo"
                      :close-on-content-click="true"
                      v-model="picker.periodo"
                      :return-value.sync="movimiento.periodo"
                      persistent
                      lazy
                      full-width
                      min-width="290px"
              >
                <v-text-field
                        slot="activator"
                        v-model="movimiento.periodo"
                        label="Periodo de cobranza"
                        prepend-icon="event"
                        readonly
                ></v-text-field>
                <v-date-picker type="month"  v-model="movimiento.periodo" @input="$refs.dialog_periodo.save(movimiento.periodo)"></v-date-picker>

              </v-dialog>
            </v-flex>


          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary" @click="modalMovimiento = false">Cancelar</v-btn>
          <v-btn flat @click="movimientoAdd">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import ApiForm from '../components/apiforms/selectbox'

  export default {
    props: ['cuenta'],
    data () {
      return {
        modalMovimiento: false,
        modalMovimientoEnCuotas: false,

        picker: {
          presentado_at:false,
          periodo:false,
        },

        forms: {
          categorias: [],
          cuentas: [],
        },

        movimiento: {
          cuenta: null
        }
      }
    },
    created: function () {
      this.movimiento.cuenta = this.cuenta;
    },
    components: {
      ApiForm
    },
    computed: {
    },
    methods: {
      movimientoAdd() {
        var vm = this;

        if(vm.movimiento.cuotas == undefined || vm.movimiento.cuotas <=1 || !vm.modalMovimientoEnCuotas ) {
          vm.movimiento.cuota_nro = 1;
          vm.movimiento.cuotas = 1;
        }

        axios({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          url: process.env.API_INGRESS + '/api/movimiento/egreso',
          data: vm.movimiento
        })
        .then(function (response) {
          vm.modalMovimiento = false;
          vm.$parent.getEgresos();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
