<template>
<div class="register-container">
    <form v-if="!this.isLoading" @submit.prevent="handleSubmit">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" placeholder="Nome" v-model.trim="name">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" v-model.trim="email">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Senha" v-model.trim="password">
        <button type="submit">Sing up</button>
        <h1>Already has a account? Go the <router-link to="/login">login</router-link> page.</h1>
    </form>
    <loading-spinner v-if="this.isLoading"></loading-spinner>
</div>
</template>

<script>
import LoadingSpinner from './ui/LoadingSpinner.vue'
export default {
    components: {
        LoadingSpinner,
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            isLoading: false,
            error: null,
        }
    },
    methods: {
        async handleSubmit() {
            this.isLoading = true;
            try {
                const newUser = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                } 
                await this.$store.dispatch('auth/singUp', newUser);
                await this.$store.dispatch('user/postUser', {
                    name: newUser.name,
                    email: newUser.email,
                    id: this.getUserId,
                });
            } catch (err) {
                this.error = err.message || 'Something went wrong';
            }
            this.isLoading = false;
        }
    },
    computed: {
        getUserId() {
            return this.$store.getters['auth/userId']; 
        }
    },
}
</script>

<style>
/* Style for register container */
.register-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
}

/* Style for form labels */
.register-container label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

/* Style for form inputs */
.register-container input[type="text"],
.register-container input[type="email"],
.register-container input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

/* Style for register button */
.register-container button[type="submit"] {
    width: 100%;
    padding: 12px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

/* Style for hover effect on register button */
.register-container button[type="submit"]:hover {
    background-color: #3e8e41;
}
</style>
