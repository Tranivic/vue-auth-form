export default {
  namespaced: true,
  state: {
    logedUser: null,
  },
  getters: {
    logedUser(state) {
      return state.logedUser;
    },
  },
  mutations: {
    setLogedUser(state, payload) {
      state.logedUser = payload;
    },
  },
  actions: {
    clearLogedUser({ commit }) {
      commit('setLogedUser', '');
    },
    async saveUserData({ commit }, payload) {
      const response = await fetch(
        `https://vue-auth-form-default-rtdb.firebaseio.com/users/${payload.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to save user data'
        );
        throw error;
      }
      commit('setLogedUser', {
        name: payload.name,
        email: payload.email,
      });
    },
    async getUserData({commit},payload) {
      const response = await fetch(
        `https://vue-auth-form-default-rtdb.firebaseio.com/users/${payload.userId}.json?auth=${payload.userToken}`,
        {
          method: 'GET',
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch user data'
        );
        throw error;
      }
      commit('setLogedUser',responseData);
    },
  },
};
