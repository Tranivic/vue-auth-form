import { createStore } from 'vuex';
import authModule from './modules/auth.js';

const store = createStore({
    modules: {
        auth: authModule,
    },
    state: {},
    getters: {
        uniqueId(state) {
            return state.uniqueId;
        },
    },
    mutations: {
        setUniqueId(state, uniqueId) {
            state.uniqueId = uniqueId;
        }
    },
    actions: {
        generateUniqueId(context) {
            const uniqueId = Math.random().toString(36).substr(2, 9);
            context.commit('setUniqueId', uniqueId);
        },
    }
});

export default store;