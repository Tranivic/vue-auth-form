<template>
    <div class="register-container">
        <form @submit.prevent="handleSubmit">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Nome" v-model="name">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" v-model="email">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Senha" v-model="password">
            <button type="submit">Cadastrar</button>
        </form>
        <h1>Or go to the <router-link to="/login">login page</router-link></h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
        }
    },
    methods: {
        handleSubmit() {
            this.$store.dispatch('generateUniqueId')
            const newUser = {
                name: 'Pedro Lucas',
                email: 'victor@aaa.com',
                password: 'kasodkaowei',
                userId: this.generatedUniqueId
            }
            this.$store.dispatch('users/postUser', newUser)
        }
    },
    computed: {
        generatedUniqueId() {
            return this.$store.getters['uniqueId']
        }
    }
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