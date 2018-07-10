import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'
import resumen from '@/pages/resumen'
import movimiento from '@/pages/movimiento'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/resumen',
      name: 'resumen',
      component: resumen
    },
    {
      path: '/movimiento/:periodo/:cuenta',
      name: 'movimiento',
      component: movimiento
    }
  ]
  /*,
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  */
})
