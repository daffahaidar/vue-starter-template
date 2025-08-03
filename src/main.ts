import '@/styles/globals.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { setupAgGrid } from '@/libs/ag-grid'
import App from '@/App.vue'
import router from '@/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // disable refetching on window focus
      refetchOnMount: false, // disable refetching on component mount
      staleTime: 5 * 60 * 1000, // 5 minutes - how long data stays fresh
      gcTime: 15 * 60 * 1000, // 15 minutes - how long inactive data is kept
      retry: 1, // number of retry attempts on failure
      retryDelay: 3000, // 3 seconds between retry attempts
      refetchOnReconnect: true,
      structuralSharing: true, // enable structural sharing between query results
    },
  },
})

const app = createApp(App)
setupAgGrid()
app.use(createPinia())
app.use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })
app.use(router)

app.mount('#app')
