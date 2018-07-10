<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>

        <!-- ALERT -->
        <v-alert
          v-if="error"

          :value="true"
          type="error"
          outline
        >
          {{ error }}
        </v-alert>
        <!-- ./ALERT -->

        <div class="text-xs-center">
          <v-progress-circular
              v-if="loading"
              indeterminate
              size="50"
              color="primary"
          ></v-progress-circular>
        </div>

        <!-- CARD -->
        <v-card flat v-if="!loading">

          <!-- MONTO DEL MES -->
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="cyan darken-3" class="white--text">
                <v-card-title>
                  <!-- LEFT -->
                  <v-flex xs8 text-xs-left>
                    <div class="headline">{{periodoMes}}</div>
                  </v-flex>
                  <v-flex xs4 text-xs-right>
                    <v-btn @click="$router.go(-1)">Volver</v-btn>
                  </v-flex>
                </v-card-title>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <v-card color="cyan darken-4" class="white--text">
                <v-card-title>
                  <!-- LEFT -->
                  <v-flex xs8 text-xs-left>
                    <div class="headline">{{cuenta}}</div>
                  </v-flex>
                  <!-- RIGHT -->
                  <v-flex xs4 text-xs-right>
                    <div class="headline">${{monto}}</div>
                  </v-flex>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
          <!-- ./MONTO DEL MES -->

          <!-- RESUMEN DE CUENTA -->
          <v-layout row wrap>
            <v-flex xs12 sm4 v-for="(item, index) in resumenPeriodo" :key="'movimiento_card-' + index">

              <v-card color="grey lighten-3 ma-1">
                <v-card-title>

                  <v-flex xs8 text-xs-left>
                    <div class="subheading">{{item.concepto}}</div>
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

                  <v-flex xs12 text-xs-center v-if="item.mode==='credito'">
                    <div class="subheading"><small>{{item.mode}}</small></div>
                  </v-flex>

                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
          <!-- ./RESUMEN DE CUENTA -->
        </v-card>
        <!-- ./CARD -->

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
  var moment = require('moment');
  moment.locale('es');

  import axios from 'axios'

  export default {
    data () {
      return {
        cuenta: '',
        periodo: '',
        periodoMes: '',

        resumenPeriodo: [],
        monto: 0,

        loading: false,
        error: null
      }
    },
    components: {
    },
    created: function () {
      this.cuenta = this.$route.params.cuenta;
      this.periodo = this.$route.params.periodo;
      this.periodoMes = this.periodoAMes(this.periodo);
      this.getEgresos();
    },
    watch: {
    },
    methods: {
      periodoAMes(periodo) {
        return moment(periodo,"YYYY-MM").format("MMMM").replace(/\b\w/g, l => l.toUpperCase());
      },
      getEgresos: function () {
        var vm = this;
        vm.loading = true;
        vm.error = false;

        axios.get(process.env.API_INGRESS+'/api/movimiento/egreso/'+vm.cuenta,{
          params: {
            periodo: vm.periodo
          }
        }).then(function (response) {

          vm.resumenPeriodo = response.data;
          vm.monto = _.sumBy(vm.resumenPeriodo,'monto');
          console.log(vm.monto);

          vm.loading = false;
        })
        .catch(function (error) {
          vm.loading = false;
          vm.error = error.message;
        });
      }
    }
  }
</script>
