import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/modules/home/pages/HomePage.vue'
import LoginPage from '@/modules/login/pages/LoginPage.vue'
import ProductPage from '@/modules/products/pages/ProductPage.vue'
import RegisterPage from '@/modules/register/pages/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        requiresAuth: false, // Halaman login tidak memerlukan autentikasi
        requestRole: [], // Tidak ada role yang diperlukan untuk halaman login
      },
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: RegisterPage,
      meta: {
        requiresAuth: false, // Halaman login tidak memerlukan autentikasi
        requestRole: [], // Tidak ada role yang diperlukan untuk halaman register
      },
    },
    {
      path: '/chart/bar',
      name: 'BarChart',
      component: HomePage,
      meta: {
        requiresAuth: true, // Halaman bar chart memerlukan autentikasi
        requestRole: ['User', 'Admin'], // Contoh peran yang diperlukan
      },
    },
    {
      path: '/ag-grid-example/products',
      name: 'Products',
      component: ProductPage,
      meta: {
        requiresAuth: true, // Halaman produk memerlukan autentikasi
        requestRole: ['Admin'], // Contoh peran yang diperlukan
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/auth/login')
  }
  next()
})

export default router
