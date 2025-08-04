<template>
  <div class="container mx-auto p-6 max-w-2xl">
    <h1 class="text-2xl font-bold mb-6 text-center">One-Way Data Binding di Vue.js</h1>

    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
      <!-- 1. Text Interpolation -->
      <div>
        <h3 class="text-lg font-semibold mb-2">1. Text Interpolation {{}}</h3>
        <p class="bg-gray-100 p-3 rounded">{{ message }}</p>
        <p class="bg-gray-100 p-3 rounded mt-2">Halo {{ userName }}, umur kamu {{ age }} tahun</p>
      </div>

      <!-- 2. Attribute Binding -->
      <div>
        <h3 class="text-lg font-semibold mb-2">2. Attribute Binding (:)</h3>
        <img :src="imageUrl" :alt="imageAlt" class="w-24 h-24 rounded" />
        <br />
        <a :href="websiteUrl" class="text-blue-500 hover:underline mt-2 inline-block">
          {{ linkText }}
        </a>
      </div>

      <!-- 3. Class Binding -->
      <div>
        <h3 class="text-lg font-semibold mb-2">3. Class Binding</h3>
        <div :class="boxClass" class="p-3 rounded text-white">
          {{ statusText }}
        </div>
      </div>

      <!-- 4. Style Binding -->
      <div>
        <h3 class="text-lg font-semibold mb-2">4. Style Binding</h3>
        <div :style="dynamicStyle" class="p-3 rounded">Text dengan style dinamis</div>
      </div>

      <!-- 5. Conditional Rendering -->
      <div>
        <h3 class="text-lg font-semibold mb-2">5. Conditional Rendering</h3>
        <p v-if="isVisible" class="bg-green-100 p-3 rounded text-green-800">
          Pesan ini terlihat karena isVisible = true
        </p>
        <p v-else class="bg-red-100 p-3 rounded text-red-800">Pesan alternatif</p>
      </div>

      <!-- 6. List Rendering -->
      <div>
        <h3 class="text-lg font-semibold mb-2">6. List Rendering</h3>
        <ul class="bg-gray-100 p-3 rounded">
          <li v-for="fruit in fruits" :key="fruit" class="mb-1">🍎 {{ fruit }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Basic data
const message = ref<string>('Ini adalah contoh one-way data binding!')
const userName = ref<string>('Budi')
const age = ref<number>(25)

// Attribute binding
const imageUrl = ref<string>('https://via.placeholder.com/100/4F46E5/FFFFFF?text=Vue')
const imageAlt = ref<string>('Vue Logo')
const websiteUrl = ref<string>('https://vuejs.org')
const linkText = ref<string>('Kunjungi Vue.js')

// Class binding
const isActive = ref<boolean>(true)
const boxClass = computed<string>(() => {
  return isActive.value ? 'bg-green-500' : 'bg-red-500'
})
const statusText = computed<string>(() => {
  return isActive.value ? 'Status: Aktif' : 'Status: Tidak Aktif'
})

// Style binding
const dynamicStyle = ref({
  color: '#e74c3c',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#f8f9fa',
})

// Conditional rendering
const isVisible = ref<boolean>(true)

// List rendering
const fruits = ref<string[]>(['Apel', 'Jeruk', 'Mangga', 'Pisang'])

// Toggle status setiap 2 detik untuk demo
setInterval(() => {
  isActive.value = !isActive.value
  isVisible.value = !isVisible.value
}, 2000)
</script>
