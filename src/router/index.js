import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: LoginForm, alias: '/' },
        {path: '/register', component: RegisterForm, }
    ],
});

export default routes;