import { createStore } from 'vuex';
import authModule from './modules/auth.js';

const store = createStore({
    modules: {
        auth: authModule,
    },
    state: {
        loggedUser: {},
    },
    getters: {},
    mutations: {
        setRegisteredUser(state, payload) {
            state.loggedUser = payload;
            console.log(payload)
        },
    },
    actions: {
        async registerUserInDatabase(context, payload) {
            const registeredUser = {
                email: payload.email,
                name: payload.name,
            }
            const responseData = await fetch(`https://vue-auth-form-default-rtdb.firebaseio.com/users/${payload.userId}.json`, {
                method: 'PUT',
                body: JSON.stringify(registeredUser)
            });
            if (!responseData.ok) {
                const error = new Error(responseData.message || 'Failed to register user in database.');
                throw error;
            }
            context.commit('setRegisteredUser', {
                userId: payload.userId,
                ...registeredUser
            });
        },
    }
});

export default store;