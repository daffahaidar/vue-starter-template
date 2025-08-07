<script setup lang="ts">
import { ref } from 'vue'
import { toRupiah } from '@/utils/currency'
import { BarChart } from '@/components/ui/chart-bar'

const dummyData = ref([
  { month: 'Jan', total: 5000000 },
  { month: 'Feb', total: 7000000 },
  { month: 'Mar', total: 6000000 },
  { month: 'Apr', total: 8000000 },
  { month: 'May', total: 9000000 },
  { month: 'Jun', total: 10000000 },
  { month: 'Jul', total: 11000000 },
  { month: 'Aug', total: 12000000 },
  { month: 'Sep', total: 13000000 },
  { month: 'Oct', total: 14000000 },
  { month: 'Nov', total: 15000000 },
  { month: 'Dec', total: 16000000 },
])
</script>

<template>
  <sidebar-layout pageTitle="Home" :breadcrumb="[{ name: 'Home' }]">
    <div class="relative mt-4 rounded-lg p-5 pb-10 shadow">
      <h1 class="text-xl font-bold">Statistik</h1>
      <BarChart
        index="month"
        :data="dummyData"
        :categories="['total']"
        :showGridLine="true"
        :colors="['var(--primary)']"
        :y-formatter="
          (tick, i) => {
            return typeof tick === 'number' ? toRupiah(tick) : ''
          }
        "
        :rounded-corners="4"
      />
    </div>
  </sidebar-layout>
</template>
