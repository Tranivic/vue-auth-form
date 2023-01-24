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
      meta: { requiresUnauth: true },
    },
    {
      path: '/register',
      component: RegisterForm,
      meta: { requiresUnauth: true },
    },
    {
      path: '/user/:userId',
      component: UserPage,
      props: true,
      meta: { requiresAuth: true },
    },
    { path: '/:notFound(.*)', component: NotFoundPage, name: 'NotFound' },
  ],
});

routes.beforeEach((to, _, next) => {
    if(to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
        next('/login');
    } else if(to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
        next('/user/' + store.getters['auth/id']);
    } else {
        next();
    }
});

export default routes;
