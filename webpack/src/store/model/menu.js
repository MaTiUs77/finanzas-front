import { make } from 'vuex-pathify'

// setup store
const state = {
  items: [
    {
      icon: 'home',
      title: 'Inicio',
      name: 'home'
    },
    {
      icon: 'description',
      title: 'Resumen',
      name: 'resumen'
    }
  ]
};

const mutations = make.mutations(state);

// create store
export default {
  state,
  mutations
}
