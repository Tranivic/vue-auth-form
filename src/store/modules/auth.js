export default {
  namespaced: true,
  state: {
    id: null,
    token: null,
    tokenExpiration: null,
  },
  getters: {
    token(state) {
      return state.token;
    },
    id(state) {
      return state.id;
    },
  },
  mutations: {
    setUserState(state, payload) {
      state.id = payload.id;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
    },
  },
  actions: {
    async login(context, payload) {
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
        const errorMessage = responseData.error.message;
        const error = new Error(errorMessage || 'Failed to login!');
        throw error;
      }
      context.commit('setUserState', {
        id: responseData.localId,
        token: responseData.idToken,
        tokenExpiration: responseData.expiresIn,
      });
    },
    async singUp(context, payload) {
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
        const errorMessage = responseData.error.message;
        const error = new Error(errorMessage || 'Failed to singup!');
        throw error;
      }
      context.commit('setUserState', {
        id: responseData.localId,
        token: responseData.idToken,
        tokenExpiration: responseData.expiresIn,
      });
    },
    logout(context) {
      context.commit('setUserState', {
        id: null,
        token: null,
        tokenExpiration: null,
      });
    },
  },
};
