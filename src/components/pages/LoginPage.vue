<template>
<div class="login-container">
    <form v-if="!isLoading" @submit.prevent="submitForm">
        <label for="email">Email</label>
        <input @focus="clearError" :class="{ 'input-error': !formValidity.isValid }" type="email" name="email" id="email" placeholder="Email" v-model.trim="email" />
        <label for="password">Password</label>
        <input @focus="clearError" :class="{ 'input-error': !formValidity.isValid }" type="password" name="password" id="password" placeholder="Password" v-model.trim="password" />
        <p v-if="!this.formValidity.isValid" class="error-message">
            {{ this.formValidity.errorMessage }}
        </p>
        <button type="submit">Login</button>
        <h1>
            First time in the app? Go to the <router-link to="/register">sing-up</router-link> page
        </h1>
    </form>
    <loading-spinner v-else></loading-spinner>
</div>
</template>

<script>
export default {
    mounted() {
        this.isLoading = false;
    },
    data() {
        return {
            email: '',
            password: '',
            formValidity: {
                isValid: true,
                errorMessage: '',
            },
            isLoading: true,
        };
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            this.checkFormValidity();
            try {
                if (this.formValidity.isValid) {
                    const loginData = {
                        email: this.email,
                        password: this.password,
                    };
                    await this.$store.dispatch('auth/login', loginData);
                    this.$router.push(`/user/${this.getUserId}`);
                }
            } catch (err) {
                if (err.message === 'INVALID_PASSWORD' || err.message === 'EMAIL_NOT_FOUND') {
                    this.formValidity.errorMessage = 'Invalid email or password';
                } else {
                    this.formValidity.errorMessage = 'Something went wrong, try again later';
                }
                this.formValidity.isValid = false;
                this.isLoading = false;
            }
        },

        checkFormValidity() {
            if (this.email.length <= 0 || this.password.length <= 0) {
                this.formValidity.isValid = false;
                this.isLoading = false;
                this.formValidity.errorMessage = 'Email and password are required';
                return;
            }
            this.formValidity.isValid = true;
            this.formValidity.errorMessage = '';
        },
        clearError() {
            this.formValidity.isValid = true;
            this.formValidity.errorMessage = '';
        },
    },
    computed: {
        getUserId() {
            return this.$store.getters['auth/id'];
        },
        getUserToken() {
            return this.$store.getters['auth/token'];
        }
    },
};
</script>

<style scoped>
.login-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
}

.login-container label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

input {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.login-container button {
    width: 100%;
    padding: 12px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 1rem 0;
}

.login-container button[type='submit']:hover {
    background-color: #3e8e41;
}

/* Error classes */
.error-message {
    color: red;
    font-weight: bold;
}

.input-error {
    border: 3px solid red;
}
</style>
