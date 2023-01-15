export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async postUser(context, payload) {
            try {
                const userId = payload.userId;
                const formatedUser = {
                    email: payload.email,
                    password: payload.password,
                    userName: payload.name  ,
                }
                const response = await fetch(`https://vue-auth-form-default-rtdb.firebaseio.com/users/${userId}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(formatedUser)
                });
                const responseData = await response.json();
                if (!response.ok) {
                    const error = new Error(responseData.message || 'Failed to fetch!');
                    throw error;
                }
            } catch (error) {
                alert(error.message)
            }
        }
    },
};