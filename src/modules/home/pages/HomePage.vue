<script setup lang="ts">
import { toRupiah } from '@/utils/currency' // Import utility function untuk format mata uang
import { BarChart } from '@/components/ui/chart-bar' // Import komponen chart bar
import { useGetStatistics } from '../queries/statistics' // Import query untuk mendapatkan data statistik

const { data: statisticData } = useGetStatistics()
</script>

<template>
  <sidebar-layout pageTitle="Home" :breadcrumb="[{ name: 'Home' }]">
    <div class="relative mt-4 rounded-lg p-5 pb-10 shadow">
      <h1 class="text-xl font-bold">Statistik</h1>
      <BarChart
        index="month"
        :data="statisticData ?? []"
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
