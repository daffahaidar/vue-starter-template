<script setup lang="ts">
import AgTable from '@/components/ui/ag-grid/AgTable.vue'
import { generateProductColumns } from '../tables/column'
import type { GridReadyEvent } from 'ag-grid-community'
import { computed, ref, type Ref } from 'vue'
import { useGetProduct } from '../queries/product'
import { useGetSession } from '@/modules/login/composable/session'
import { CalendarIcon } from 'lucide-vue-next'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import Label from '@/components/ui/label/Label.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import type { DateRange } from 'reka-ui'
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

const dateValue = ref({
  start: undefined,
  end: undefined,
}) as Ref<DateRange>

const { accessToken } = useGetSession()

const selectedCategory = ref<string | null>(null)

const { data, isPending } = useGetProduct(
  accessToken.value,
  computed(() => selectedCategory.value),
  computed(() => (dateValue.value.start ? dateValue.value.start : null)),
  computed(() => (dateValue.value.end ? dateValue.value.end : null)),
)
const columnData = computed(() => generateProductColumns())
const rowData = computed<unknown[]>(() => (Array.isArray(data.value) ? data.value : []))
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
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="
                cn(
                  'w-[280px] justify-start text-left font-medium',
                  !dateValue && 'text-muted-foreground',
                )
              "
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              <template v-if="dateValue.start">
                <template v-if="dateValue.end">
                  {{ df.format(dateValue.start.toDate(getLocalTimeZone())) }} -
                  {{ df.format(dateValue.end.toDate(getLocalTimeZone())) }}
                </template>
                <template v-else>
                  {{ df.format(dateValue.start.toDate(getLocalTimeZone())) }}
                </template>
              </template>
              <template v-else> Pilih rentang tanggal </template>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <RangeCalendar
              v-model="dateValue"
              initial-focus
              :number-of-months="1"
              :maximum-days="31"
              :maximum-value="today(getLocalTimeZone())"
              :locale="'id'"
              weekdayFormat="short"
              @update:start-value="(startDate) => (dateValue.start = startDate)"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
    <AgTable
      class="mt-4"
      :row-data="rowData"
      :column-defs="columnData"
      :loading="isPending"
      :grid-options="customGridOptions"
      @grid-ready="handleGridReady"
    />
  </sidebar-layout>
</template>
