import { make } from 'vuex-pathify'

// setup store
const state = {
  name: 'Matias Flores',
}
const mutations = make.mutations(state)

// create store
export default {
  state,
  mutations
}
