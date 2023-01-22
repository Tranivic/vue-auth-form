import { createStore } from 'vuex';
import authModule from './modules/auth.js';

const store = createStore({
  modules: {
    auth: authModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
