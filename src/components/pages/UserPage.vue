<template>
<section>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div v-else>
        <h1>Welcome, {{ getLogedUser.name }}. You are logged in!</h1>
        <button @click="logoutUser">Logout</button>
    </div>
</section>
</template>

<script>
import LoadingSpinner from '../ui/LoadingSpinner.vue';
export default {
    components: {
        LoadingSpinner,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    created() {
        this.isLoading = true;
        if (!this.getLogedUser) {
            this.loadUserData();
            return;
        }
        this.isLoading = false;
    },
    methods: {
        logoutUser() {
            this.$store.dispatch('user/clearLogedUser');
            this.$store.dispatch('auth/logout');
            this.$router.replace('/login');
        },
        async loadUserData() {
            const userId = this.$store.getters['auth/id'];
            const userToken = this.$store.getters['auth/token'];

            try {
                await this.$store.dispatch('user/getUserData', {
                    userId,
                    userToken,
                });
                this.isLoading = false;
            } catch (err) {
                alert(err);
            }
        },
    },
    computed: {
        getLogedUser() {
            return this.$store.getters['user/logedUser'];
        },
    },
};
</script>

<style scoped>
section {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
}

h1 {
    font-size: 2rem;
    font-family: 'Roboto', sans-serif;
    padding-bottom: 3rem;
}

button {
    background-color: #ff0000;
    /* red */
    color: #ffffff;
    /* white */
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

button:hover {
    background-color: #cc0000;
    /* dark red */
}
</style>
