<template>
<div class="register-container">
    <form v-if="!this.isLoading" @submit.prevent="handleSubmit">
        <label for="name">Name</label>
        <input @keydown="cleanError(name)" :class="{'input-error': !this.name.isValid}" type="text" name="name" id="name" placeholder="Nome" v-model.trim="name.value">
        <label for="email">Email</label>
        <input @keydown="cleanError(email)" :class="{'input-error': !this.email.isValid}" type="email" name="email" id="email" placeholder="Email" v-model.trim="email.value">
        <label for="password">Password</label>
        <input @keydown="cleanError(password)" :class="{'input-error': !this.password.isValid}" type="password" name="password" id="password" placeholder="Senha" v-model.trim="password.value">
        <p class="error-message">{{ this.formValidity.errorMessage }}</p>
        <button type="submit">Sing up</button>
        <h1>Already has a account? Go to the <router-link to="/login">login</router-link> page.</h1>
    </form>
    <loading-spinner v-else></loading-spinner>
</div>
</template>

<script>
export default {
    data() {
        return {
            name: {
                value: '',
                isValid: true,
            },
            email: {
                value: '',
                isValid: true,
            },
            password: {
                value: '',
                isValid: true,
            },
            formValidity: {
                isValid: true,
                errorMessage: '',
            },
            isLoading: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.isLoading = true;
            await this.checkFormValidity();
            try {
                if (this.formValidity.isValid) {
                    const newUser = {
                        name: this.name.value,
                        email: this.email.value,
                        password: this.password.value,
                    }
                    await this.$store.dispatch('auth/singUp', newUser);
                    await this.$store.dispatch('user/saveUserData', {
                        name: newUser.name,
                        email: newUser.email,
                        id: this.getUserId,
                    });
                    await this.$router.push(`/user/${this.getUserId}`);
                }
                throw new Error(this.formValidity.errorMessage);
            } catch (err) {
                console.log(err)
                if (err.message === 'EMAIL_EXISTS') {
                    this.formValidity.errorMessage = 'E-mail already registered';
                    this.email.isValid = false;
                } else {
                    this.formValidity.errorMessage = err.message || 'Something went wrong, try again later';
                }
                this.formValidity.isValid = false;
                this.isLoading = false;
            }
        },
        async checkFormValidity() {
            let fields = [{
                name: this.name.value
            }, {
                email: this.email.value
            }, {
                password: this.password.value
            }];

            let fieldsMissing = fields.filter(field => Object.values(field)[0].trim() === '');
            let errorMessage = '';
            let passwordTooShort = this.password.value.length < 6;

            if (fieldsMissing.length === fields.length) {
                this.name.isValid = false;
                this.email.isValid = false;
                this.password.isValid = false;
                errorMessage = 'All fields are required';
            } else if (fieldsMissing.length > 0) {
                fieldsMissing = fieldsMissing.map(field => Object.keys(field)[0]);
                errorMessage = `${(fieldsMissing.length > 1 ? 'The fields ' : 'The')} ${fieldsMissing.join(' and ')} ${(fieldsMissing.length > 1 ? ' are' : ' is')} required`;
                fieldsMissing.forEach(field => this[field].isValid = false)
            } else if (passwordTooShort) {
                this.password.isValid = false;
                errorMessage = 'The password must have at least 6 characters';
            }
            this.formValidity = {
                isValid: fieldsMissing.length === 0 && !passwordTooShort,
                errorMessage
            };
        },
        cleanError(camp) {
            if (camp.isValid === false) {
                camp.isValid = true;
                const allCamps = [this.name.isValid, this.email.isValid, this.password.isValid];
                if (!allCamps.includes(false)) {
                    this.formValidity = {
                        isValid: true,
                        errorMessage: '',
                    }
                }
            }
        },
    },
    computed: {
        getUserId() {
            return this.$store.getters['auth/id'];
        }
    },
}
</script>

<style scoped>
.register-container {
    width: min(100%, 400px);
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
}

label {
    display: block;
    margin-bottom: 5px;
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

button {
    width: 100%;
    padding: 12px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 1rem 0;
}

button:hover {
    background-color: #3e8e41;
}

.error-message {
    color: red;
    font-weight: bold;
}

.input-error {
    border: 3px solid red;
}
</style>
