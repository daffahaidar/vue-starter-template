<script setup lang="ts">
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { toRupiah } from '@/utils/currency'

defineProps<{
  title?: string
  data: {
    name: string
    color: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  }[]
}>()
</script>

<template>
  <Card class="rounded-lg p-2 text-sm">
    <CardTitle v-if="title">
      {{ title }}
    </CardTitle>
    <CardContent class="-mt-4 flex min-w-[180px] flex-col gap-1 p-0">
      <div v-for="(item, key) in data" :key="key" class="flex justify-between">
        <div class="flex items-center">
          <span class="mr-2 h-2.5 w-2.5">
            <svg width="100%" height="100%" viewBox="0 0 30 30">
              <path
                d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                :stroke="item.color"
                :fill="item.color"
                stroke-width="1"
              />
            </svg>
          </span>
          <span class="capitalize">{{ item.name }}</span>
        </div>
        <span class="ml-4 font-semibold">{{
          typeof item.value === 'number' ? toRupiah(item.value) : item.value
        }}</span>
      </div>
    </CardContent>
  </Card>
</template>
