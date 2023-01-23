export default {
    namespaced: true,
    state: {
        logedUser: null,
    },
    getters: {
        
    },
    mutations: {
        teste(_, payload) {
            console.log(payload)
        }
     
    },
    actions: {
        postUserData(){
            // To do...
        }
    }
};