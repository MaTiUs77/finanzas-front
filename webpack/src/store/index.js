// libraries
import Vue from 'vue'
import Vuex from 'vuex'

// Pathify
import pathify from 'vuex-pathify';
import { make } from 'vuex-pathify'

import user from './model/user';
import menu from './model/menu';

Vue.use(Vuex);

const state = {};
const mutations = make.mutations(state);

const store = new Vuex.Store({
  // Don't forget the plugin!
  plugins: [pathify.plugin],
  state,
  mutations,
  modules: {
    user,
    menu
  }
});

export default store
window.store = store