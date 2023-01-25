<template>
<div class="login-container">
    <form @submit.prevent="submitForm">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" v-model.trim="email" />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" v-model.trim="password" />
        <p v-if="!this.formValidity.isValid" class="error-message">
            {{ this.formValidity.errorMessage }}
        </p>
        <button type="submit">Login</button>
        <h1>
            First time in the app? Go to the
            <router-link to="/register">sing-up</router-link> page
        </h1>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formValidity: {
                isValid: true,
                errorMessage: '',
            },
        };
    },
    methods: {
        async submitForm() {
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
                console.log(err)
                this.formValidity.isValid = false;
                this.formValidity.errorMessage = err || 'Something went wrong';
            }
        },

        checkFormValidity() {
            if (this.email.length <= 0 || this.password.length <= 0) {
                this.formValidity.isValid = false;
                this.formValidity.errorMessage = 'Email and password are required';
                return;
            }
            if (this.password.length < 6) {
                this.formValidity.isValid = false;
                this.formValidity.errorMessage = 'Password must be at least 6 characters';
                return;
            }
            this.formValidity.isValid = true;
            this.formValidity.errorMessage = '';
        },
    },
    computed: {
        getUserId() {
            return this.$store.getters['auth/id'];
        },
        getUserToken(){
            return this.$store.getters['auth/token'];
        }
    },
};
</script>

<style scoped>
/* Style for login container */
.login-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
}

/* Style for form labels */
.login-container label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

/* Style for form inputs */
.login-container input[type='email'],
.login-container input[type='password'] {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

/* Style for login button */
.login-container button[type='submit'] {
    width: 100%;
    padding: 12px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

/* Style for hover effect on login button */
.login-container button[type='submit']:hover {
    background-color: #3e8e41;
}

.error-message {
    color: red;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
