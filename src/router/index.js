import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/pages/LoginPage.vue';
import RegisterPage from '../components/pages/RegisterPage.vue';
import UserPage from '../components/pages/UserPage.vue';
import NotFoundPage from '../components/pages/NotFound.vue';
import store from '../store/index.js';

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: LoginPage,
      alias: '/',
      meta: { requiresUnAuth: true },
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: { requiresUnAuth: true },
    },
    {
      path: '/user/:userId',
      component: UserPage,
      props: true,
      meta: { requiresAuth: true, requireSameLoggedUser: true },
    },
    { path: '/:notFound(.*)', component: NotFoundPage, name: 'NotFound' },
  ],
});

routes.beforeEach(async (to, _, next) => {
  await store.dispatch('auth/checkAuth');
  if (!store.getters['auth/isAuthenticated'] && to.meta.requiresAuth) {
    return next('/login');
  }
  if (store.getters['auth/isAuthenticated'] && to.meta.requiresUnAuth) {
    return next('/user/' + store.getters['auth/id']);
  }
  if (to.meta.requiresAuth && to.params.userId !== store.getters['auth/id']) {
    return next('/user/' + store.getters['auth/id']);
  }
  next();
});

export default routes;
