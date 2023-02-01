<template>
<section v-if="!isLoading">
    <div class="user-info">
        <h1>Welcome, {{ getLogedUser.name }}.</h1>
    </div>
    <user-goals></user-goals>
    <div class="btn-container">
        <button class="logout-btn" @click="logoutUser">Logout</button>
    </div>
</section>
</template>

<script>
import UserGoals from '../UserGoals.vue';
export default {
    components: {
        UserGoals,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    async created() {
        this.isLoading = true;
        if (!this.getLogedUser) {
            await this.loadUserData();
            this.isLoading = false;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

h1 {
    font-size: 2rem;
    padding-bottom: 3rem;
}

.logout-btn {
    background-color: #ff0000;
    color: #ffffff;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.logout-btn:hover {
    background-color: #cc0000;
}
</style>
