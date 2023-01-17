export default {
  namespaced: true,
  state: {
    userId: null,
    token: null,
    tokenExpiration: null,
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
      console.log(state);
    },
  },
  actions: {
    teste(context) {
      console.log(context)
    },
    async login({ commit }, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDNr22n_oyIauuFGR-JyJpKyOl_1eBrTE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData.error.message)
        const error = new Error(responseData.error.message || 'Failed to login, try again later.');
        throw error;
      }
      commit('setUser', {
        userId: responseData.localId,
        token: responseData.idToken,
        tokenExpiration: responseData.expiresIn,
      });
    },
    async singUp({commit, dispatch}, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDNr22n_oyIauuFGR-JyJpKyOl_1eBrTE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData.error.message)
        const error = new Error(responseData.error.message || 'Failed to sing up, try again later.');
        throw error;
      }
      commit('setUser', {
        userId: responseData.localId,
        token: responseData.idToken,
        tokenExpiration: responseData.expiresIn,
      });
      dispatch('registerUserInDatabase', {
        userId: responseData.localId,
        email: payload.email,
        name: payload.name,
      }, { root: true });
    },
  },
};
