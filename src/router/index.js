import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import UserPage from '../components/pages/UserPage.vue';
const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: LoginForm, alias: '/' },
        {path: '/register', component: RegisterForm, },
        {path:"/user/:userId", component: UserPage, props: true},
    ],
});

export default routes;