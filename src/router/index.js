import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import UserPage from '../components/pages/UserPage.vue';
import NotFoundPage from '../components/pages/NotFound.vue';
import store from '../store/index.js';

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/login', component: LoginForm, alias: '/' },
        {path: '/register', component: RegisterForm, },
        {path: '/user/:userId', component: UserPage, props: true, beforeEnter(to, from, next) {
            if (store.state.auth.userId === to.params.userId) {
                next();
            } else {
                next({name: 'NotFound', params: {notFound: 'user'}});
            }
        } },
        {path: '/:notFound(.*)', component: NotFoundPage, name: 'NotFound' }
    ],
});

export default routes;