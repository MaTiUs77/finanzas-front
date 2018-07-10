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

        <v-tabs
          v-if="!loading"
          v-model="tabSelected"
          dark
          color="cyan"
          show-arrows
        >
          <v-tabs-slider color="primary"></v-tabs-slider>

          <!-- TAB HEADER -->
          <v-tab
            v-for="item in porPeriodo"
            :href="'#periodo-' + item.periodo"
            :key="'key_periodo_'+item.periodo"
          >
            {{ item.periodoMes }}
          </v-tab>
          <!-- ./TAB HEADER -->

          <!-- TAB CONTENT -->
          <v-tabs-items>
            <v-tab-item
              v-for="resumenPeriodo in porPeriodo"
              :id="'periodo-' + resumenPeriodo.periodo"
              :key="'key_resumen_periodo_'+resumenPeriodo.periodo"
            >
              <!-- CARD -->
              <v-card flat>
                <!-- MONTO DEL MES -->
                <v-layout row wrap>
                  <v-flex xs12>

                    <v-card color="cyan darken-4" class="white--text">
                      <v-card-title>
                        <!-- LEFT -->
                        <v-flex xs8 text-xs-left>
                          <div class="headline">{{resumenPeriodo.periodoMes}}</div>
                        </v-flex>
                        <!-- RIGHT -->
                        <v-flex xs4 text-xs-right>
                          <div class="headline">${{resumenPeriodo.monto}}</div>
                        </v-flex>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-layout>
                <!-- ./MONTO DEL MES -->

                <div v-for="(items, tipo_cuenta) in transformToTipoCuenta(resumenPeriodo.porCuenta)">
                  <v-subheader :key="tipo_cuenta">{{ tipo_cuenta }}</v-subheader>

                  <!-- RESUMEN DE CUENTA -->
                  <v-layout row wrap>
                    <v-flex xs12 sm4 v-for="(item, index) in items" :key="'cuenta_card-' + index">

                      <v-card color="grey lighten-3 ma-1"
                          :to="{ name: 'movimiento', params: { periodo: resumenPeriodo.periodo, cuenta: item.cuenta.nombre }}">
                        <v-card-title>

                          <v-flex xs8 text-xs-left>
                            <div class="subheading">{{item.cuenta.nombre}}</div>
                          </v-flex>

                          <v-flex xs4 text-xs-right>
                            <div class="subheading">${{item.monto}}</div>
                          </v-flex>

                        </v-card-title>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <!-- ./RESUMEN DE CUENTA -->

                </div>
              </v-card>
              <!-- ./CARD -->
            </v-tab-item>
          </v-tabs-items>
          <!-- ./TAB CONTENT -->

        </v-tabs>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
  import axios from 'axios'
  var moment = require('moment');
  moment.locale('es');

  export default {
    data () {
      return {
        loading: false,
        filtroPeriodo: null,
        tabSelected: null,
        porPeriodo:[],

        error: null
      }
    },
    components: {
    },

    created: function () {
      this.activateTab(moment().format("YYYY-MM"));
      this.getEgresos();
    },
    computed: {
    },
    watch: {
    },
    methods: {
      activateTab(periodo) {
        this.tabSelected = 'periodo-'+periodo;
      },
      periodoAMes(periodo) {
        return moment(periodo,"YYYY-MM").format("MMMM").replace(/\b\w/g, l => l.toUpperCase());
      },
      transformToPeriodo(response) {
        var vm = this;
        // ARRAY DE CUENTAS
        let listaCuentas = _.transform(response.data, function(result, item, key) {
          (result[item.cuenta.nombre] || (result[item.cuenta.nombre] = {})).cuenta = item.cuenta;
        }, {});

        // ARRAY DE CUENTAS
        let listaCategorias = _.transform(response.data, function(result, item, key) {
          (result[item.categoria.nombre] || (result[item.categoria.nombre] = {})).categoria = item.categoria;
        }, {});

        // ARRAY DE PERIODOS
        vm.porPeriodo= _.transform(response.data, function(result, item, key) {
          let transformObject = {
            periodoMes: vm.periodoAMes(item.periodo),
            periodo: item.periodo,
            monto: 0,
            items:[]
          };
          (result[item.periodo] || (result[item.periodo] = transformObject)).items.push(item);
        }, {});
        _.each(vm.porPeriodo,function(obj,key){
          obj.monto = _.sumBy(obj.items,'monto');
          obj.porCuenta = vm.transformToCuenta(obj.items);
        });

        // VUEX
        store.commit('cuentas',listaCuentas);
        store.commit('categorias',listaCategorias);
        store.commit('periodos',vm.porPeriodo)
      },
      transformToCuenta(items) {
        var vm = this;
        let porCuenta = _.transform(items, function(result, item, key) {
          let transformObject = {
            monto: 0,
            cuenta: item.cuenta,
            items:[]
          };
          (result[item.cuenta.nombre] || (result[item.cuenta.nombre] = transformObject)).items.push(item);
        }, {});

        _.each(porCuenta,function(obj,key){
          obj.monto = _.sumBy(obj.items,'monto');
        });

        return porCuenta;
      },
      transformToTipoCuenta(items) {
        let porTipoCuenta = _.transform(items, function(result, item, key) {
          (result[item.cuenta.tipo_cuenta.nombre] || (result[item.cuenta.tipo_cuenta.nombre] = [])).push(item);
        }, {});

        return porTipoCuenta;
      },
      getEgresos: function () {
        var vm = this;
        vm.loading = true;
        vm.error = false;

        axios.get(process.env.API_INGRESS+'/api/movimiento/egreso',{
          params: {
            periodo: 'all'
          }
        }).then(function (response) {
          vm.transformToPeriodo(response);
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
