import { createRouter, createWebHistory } from 'vue-router'
import { LocalStorage } from 'quasar'

function requireAuth(to, from, next) {
  const token = LocalStorage.getItem('token');
  if (token) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'house-rule',
    component: () => import( '../views/HouseRulesPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    requireAuth(to, from, next);
  } else {
    next();
  }
});

export default router