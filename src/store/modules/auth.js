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
    async isTokenValid() {
      console.log('Checking token validity...');
      if (localStorage.getItem('token')) {
        const tokenExpiration = localStorage.getItem('tokenExpiration') * 100;
        const tokenCreatedTime = localStorage.getItem('authTime');
        const currentTime = new Date().getTime();
        const tokenDuration = currentTime - tokenCreatedTime;
        const tokenExpiresIn = tokenExpiration - tokenDuration;

        console.log(
          'Token expires in: ' + parseInt(tokenExpiresIn / 1000) + 's'
        );
        if (tokenDuration > tokenExpiration) {
          console.log('Token expired');
          return false;
        }
        console.log('Token still valid');
        return true;
      }
      console.log('No token found');
      return false;
    },

    async checkAuth(context) {
      const tokenStillValid = await context.dispatch('isTokenValid');
      if (tokenStillValid) {
        context.commit('setUserState', {
          id: localStorage.getItem('userId'),
          token: localStorage.getItem('token'),
          tokenExpiration: localStorage.getItem('tokenExpiration'),
        });
        return;
      }
      context.dispatch('logout');
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
      const API_KEY = process.env.VUE_APP_API_KEY;
      console.log(API_KEY)
      let defaultErrorMessage = 'Failed to sigup!';
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      if (payload.mode === 'login') {
        defaultErrorMessage = 'Failed to login!';
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
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
