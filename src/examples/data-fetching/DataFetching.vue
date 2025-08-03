<script setup lang="ts">
import { api } from '@/libs/axios'
import { endpoint } from '@/api'
import { ref, onMounted, onUnmounted } from 'vue'

const data = ref(null)
const errorData = ref<unknown | null>(null)
const loading = ref(true)
const isError = ref(false)
const isRefetching = ref(false)
const retryCount = ref(0)
const maxRetries = 3
let pollingInterval: number | null = null

const fetchProducts = async (isRefetch = false) => {
  if (isRefetch) isRefetching.value = true
  else loading.value = true

  try {
    const response = await api.get(endpoint.product)
    data.value = response.data
    isError.value = false
    errorData.value = null
    retryCount.value = 0
  } catch (error) {
    errorData.value = error
    isError.value = true

    if (retryCount.value < maxRetries) {
      retryCount.value++
      setTimeout(() => fetchProducts(), 2000)
    }
  } finally {
    loading.value = false
    isRefetching.value = false
  }
}

const retryFetch = () => {
  retryCount.value = 0
  fetchProducts()
}

const startPolling = () => {
  pollingInterval = setInterval(() => fetchProducts(true), 5000)
}

onMounted(() => {
  fetchProducts()
  startPolling()
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="isError">
      Error: {{ errorData }}
      <button @click="retryFetch">Retry</button>
    </div>
    <div v-else>
      <pre><code>{{ data }}</code></pre>
      <button @click="() => fetchProducts(true)">
        {{ isRefetching ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>
  </div>
</template>
