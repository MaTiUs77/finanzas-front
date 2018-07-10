const module = {
  state: {
    periodos: [],
    cuentas: [],
    categorias: []
  },
  mutations: {
    periodos (state, payload) {
      state.periodos = payload
    },
    cuentas (state, payload) {
      state.cuentas = payload
    },
    categorias(state, payload) {
      state.categorias= payload
    }
  },
  actions: {
/*
    increment (context) {
      context.commit('increment')
    }
*/
  }
};

// create store
export default module