import { createStore } from 'vuex';
import authModule from './modules/auth.js';
import userModule from './modules/user.js';

const store = createStore({
  modules: {
    auth: authModule,
    user: userModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
