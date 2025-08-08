import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/modules/home/pages/HomePage.vue'
import LoginPage from '@/modules/login/pages/LoginPage.vue'
import ProductPage from '@/modules/products/pages/ProductPage.vue'
import { useAuthStore } from '@/modules/login/stores/auth'
import { pinia } from '@/libs/pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage,
      meta: {
        requiresAuth: false, // Halaman login tidak memerlukan autentikasi
      },
    },
    {
      path: '/chart/bar',
      name: 'BarChart',
      component: HomePage,
      meta: {
        requiresAuth: true, // Halaman bar chart memerlukan autentikasi
      },
    },
    {
      path: '/ag-grid-example/products',
      name: 'Products',
      component: ProductPage,
      meta: {
        requiresAuth: true, // Halaman produk memerlukan autentikasi
      },
    },
  ],
})

// middleware untuk memeriksa autentikasi
router.beforeEach((to, from, next) => {
  const auth = useAuthStore(pinia) // Ambil store autentikasi

  // Jika rute memerlukan autentikasi dan pengguna belum login, arahkan ke halaman login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/') // Saat ini halaman login berada di root path (Kedepannya bisa diubah menjadi '/login')
  }

  // Uncomment ini jika ingin mengarahkan pengguna yang sudah login ke halaman dashboard
  // if (to.name === 'LoginPage' && auth.isLoggedIn) {
  //   return next('/dashboard')
  // }

  next() // Lanjutkan ke rute yang diminta
})

export default router
