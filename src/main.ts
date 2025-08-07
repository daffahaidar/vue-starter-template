import '@/styles/globals.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { setupAgGrid } from '@/libs/ag-grid'
import App from '@/App.vue'
import SidebarLayout from '@/components/layout/SidebarLayout.vue'
import router from '@/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // refetch ketika halaman dibuka
      refetchOnMount: false, // refetch ketika component dimount
      staleTime: 5 * 60 * 1000, // 5 minutes - Berapa lama data dianggap fresh
      gcTime: 15 * 60 * 1000, // 15 minutes - Waktu untuk menghapus data yang tidak lagi digunakan
      retry: 1, // jumlah percobaan ulang jika terjadi error
      retryDelay: 3000, // 3 seconds - jeda antara percobaan ulang
      refetchOnReconnect: true, // refetch ketika koneksi internet terhubung kembali
      structuralSharing: true, // menggunakan struktur data yang sama untuk mengurangi penggunaan memori
    },
  },
})

const app = createApp(App)
setupAgGrid()
app.use(createPinia())
app.use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })
app.use(router)
app.component('sidebar-layout', SidebarLayout)

app.mount('#app')
