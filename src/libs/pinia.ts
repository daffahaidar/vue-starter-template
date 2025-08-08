import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
pinia.use(piniaPersistedstate)
