import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/modules/home/pages/HomePage.vue'
import LoginPage from '@/modules/login/pages/LoginPage.vue'
import ProductPage from '@/modules/products/pages/ProductPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/chart/bar',
      name: 'BarChart',
      component: HomePage,
    },
    {
      path: '/ag-grid-example/products',
      name: 'Products',
      component: ProductPage,
    },
  ],
})

export default router
