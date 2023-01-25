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
    isAuthenticated(state) {
      return !!state.token;
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
    isTokenValid() {
      const tokenExpiration = localStorage.getItem('tokenExpiration') * 100;
      const tokenCreatedTime = localStorage.getItem('authTime');
      const currentTime = new Date().getTime();
      const tokenDuration = currentTime - tokenCreatedTime;
      const tokenExpiresIn = tokenExpiration - tokenDuration

      console.log('Token expires in: '+ tokenExpiresIn+'ms');
      if (tokenDuration > tokenExpiration) {
        console.log('Token expired');
        return false;
      }
      console.log('Token still valid');
      return true;
    },
    checkAuth(context) {
      if (localStorage.getItem('token') && context.dispatch('isTokenValid')) {
        context.commit('setUserState', {
          id: localStorage.getItem('userId'),
          token: localStorage.getItem('token'),
          tokenExpiration: localStorage.getItem('tokenExpiration'),
        });
      }
    },
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    },
    async singUp(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'singup',
      });
    },
    async auth(context, payload) {
      let defaultErrorMessage = 'Failed to sigup!';
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDNr22n_oyIauuFGR-JyJpKyOl_1eBrTE';
      if (payload.mode === 'login') {
        defaultErrorMessage = 'Failed to login!';
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDNr22n_oyIauuFGR-JyJpKyOl_1eBrTE';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const errorMessage = responseData.error.message;
        const error = new Error(errorMessage || defaultErrorMessage);
        throw error;
      }

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', responseData.expiresIn);
      localStorage.setItem('authTime', new Date().getTime());

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
      localStorage.clear();
    },
  },
};
