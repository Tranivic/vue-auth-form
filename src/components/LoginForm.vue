<template>
    <div class="login-container">
        <form @submit.prevent="submitForm">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
        <h1>First time in the app? Go to the <router-link to="/register">register</router-link> page</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        submitForm() {
            if(this.checkFormValidity.isValid) {
                const user = {
                    email: this.email,
                    password: this.password,
                }
                console.log(user)
            } else {
                alert(this.checkFormValidity.errorMsg)
            }

        },
    },
    computed: {
        checkFormValidity() {
            if(this.email === '') {
                return {
                    errorMsg: 'Email is required',
                    isValid: false,
                }
            }
            if(this.password === '') {
                return {
                    errorMsg: 'Password is required',
                    isValid: false,
                }
            }
            if(this.password.length < 6) {
                return {
                    errorMsg: 'Password must have at least 6 characters',
                    isValid: false,
                }
            }
            if(this.email.includes('@') === false) {
                return{
                    errorMsg: 'Email must have a @',
                    isValid: false,
                }
            }
            if(this.email.includes('.') === false) {
                return{
                    errorMsg: 'Email must have a .',
                    isValid: false,
                }
            }
            return true
        }
    },
}
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
.login-container input[type="email"],
.login-container input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

/* Style for login button */
.login-container button[type="submit"] {
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

/* Style for hover effect on login button */
.login-container button[type="submit"]:hover {
    background-color: #3e8e41;
}
</style>