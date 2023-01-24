import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import UserPage from '../components/pages/UserPage.vue';
import NotFoundPage from '../components/pages/NotFound.vue';
import store from '../store/index.js';

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: LoginForm,
      alias: '/',
      beforeEnter: (to, from, next) => {
        if (store.state.auth.id) {
          next('/user/' + store.state.auth.id);
        } else {
          next();
        }
      },
    },
    { path: '/register', component: RegisterForm },
    {
      path: '/user/:userId',
      component: UserPage,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.userId === store.state.auth.id) {
          next();
        } else {
          next('/login');
        }
      },
    },
    { path: '/:notFound(.*)', component: NotFoundPage, name: 'NotFound' },
  ],
});

export default routes;
