<script setup lang="ts">
import AgTable from '@/components/ui/ag-grid/AgTable.vue'
import { generateProductColumns } from '../tables/column'
import type { GridReadyEvent } from 'ag-grid-community'
import { computed, ref } from 'vue'
import { useGetProduct } from '../queries/product'
import { useGetSession } from '@/modules/login/composable/session'
import { CalendarIcon } from 'lucide-vue-next'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import Label from '@/components/ui/label/Label.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { DateValue } from 'reka-ui'
import { cn } from '@/libs/shadcn'
import Button from '@/components/ui/button/Button.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetCategories } from '../queries/category'
import { Calendar } from '@/components/ui/calendar'

const startDate = ref<DateValue>()
const endDate = ref<DateValue>()

const { accessToken } = useGetSession()

const selectedCategory = ref<string | null>(null)

const { data, isPending } = useGetProduct(
  accessToken.value,
  computed(() => selectedCategory.value),
  computed(() => (startDate.value ? startDate.value : null)),
  computed(() => (endDate.value ? endDate.value : null)),
)

const columnData = computed(() => generateProductColumns())
const rowData = computed<unknown[]>(() => (Array.isArray(data.value) ? data.value : []))

// Hitung total stock quantity
const totalStock = computed(() => {
  if (!Array.isArray(data.value)) return 0
  return data.value.reduce(
    (
      total: number,
      item: {
        stock_quantity?: number
      },
    ) => {
      return total + (item.stock_quantity || 0)
    },
    0,
  )
})

// Buat pinned bottom row data untuk menampilkan total
const pinnedBottomRowData = computed(() => [
  {
    name: 'TOTAL',
    description: '',
    arrival_date: '',
    price: '',
    'category.name': '',
    stock_quantity: totalStock.value,
  },
])

const customGridOptions = {
  rowHeight: 40,
  headerHeight: 50,
}

const { data: categoryData } = useGetCategories()

const handleGridReady = (event: GridReadyEvent) => {
  event.api.sizeColumnsToFit()
}

const df = new DateFormatter('id-ID', { dateStyle: 'medium' })
</script>

<template>
  <sidebar-layout
    pageTitle="Products"
    :breadcrumb="[{ name: 'Ag Grid Example' }, { name: 'Products' }]"
  >
    <div class="flex gap-4">
      <div class="grid gap-2">
        <Label class="text-sm font-medium"> Kategori </Label>
        <Select v-model="selectedCategory" :disabled="!categoryData">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategori</SelectLabel>
              <SelectItem
                v-for="value in categoryData"
                :key="value.category_id"
                :value="value.name"
              >
                {{ value.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="grid gap-2">
        <Label class="text-sm font-medium"> Rentang Tanggal Masuk </Label>
        <div class="flex gap-2">
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[280px] justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ startDate ? df.format(startDate.toDate(getLocalTimeZone())) : 'Pilih Tanggal' }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="startDate" initial-focus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[280px] justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ endDate ? df.format(endDate.toDate(getLocalTimeZone())) : 'Pilih Tanggal' }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="endDate" initial-focus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
    <AgTable
      class="mt-4"
      :row-data="rowData"
      :column-defs="columnData"
      :loading="isPending"
      :grid-options="customGridOptions"
      :pinned-bottom-row-data="pinnedBottomRowData"
      @grid-ready="handleGridReady"
    />
  </sidebar-layout>
</template>
