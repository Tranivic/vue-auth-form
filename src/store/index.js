import { createStore } from 'vuex';
import usersModule from './users/users.js';

const store = createStore({
    modules: {
        users: usersModule,
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
});

export default store;