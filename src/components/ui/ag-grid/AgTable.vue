<script setup lang="ts">
import { computed, defineProps, withDefaults, defineEmits, ref, onMounted, onUnmounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type {
  GridOptions,
  ColDef,
  GridReadyEvent,
  CellClickedEvent,
  GridApi,
} from 'ag-grid-community'
import { themeQuartz } from 'ag-grid-community'

const gridApi = ref<GridApi | null>(null)

const myTheme = themeQuartz.withParams({
  browserColorScheme: 'light',
  headerBackgroundColor: 'var(--primary)',
  headerFontSize: 14,
  headerFontWeight: '600',
  headerTextColor: '#FFFFFF',
  headerVerticalPaddingScale: 0.75,
  oddRowBackgroundColor: '#FDFAF8',
})

import { createColumnDefs, getDefaultGridOptions } from '@/libs/ag-grid'

interface DataGridProps {
  rowData?: unknown[] | undefined
  loading?: boolean
  columnDefs?: Partial<ColDef>[]
  gridOptions?: Partial<GridOptions>
  theme?: string
  height?: string
  pagination?: boolean
  paginationPageSize?: number
  notFoundDataMessage?: string
  loadingText?: string
}

const props = withDefaults(defineProps<DataGridProps>(), {
  rowData: () => [],
  columnDefs: () => [],
  gridOptions: () => ({}),
  height: '80vh',
  pagination: true,
  paginationPageSize: 20,
  theme: 'ag-theme-quartz',
  notFoundDataMessage: 'Data belum tersedia.',
  loadingText: 'Memuat data...',
})

const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`

const emit = defineEmits<{
  (e: 'gridReady', event: GridReadyEvent): void
  (e: 'cellClicked', event: CellClickedEvent): void
}>()

const finalGridOptions = computed(() => ({
  ...getDefaultGridOptions(),
  pagination: props.pagination,
  paginationPageSize: props.paginationPageSize,
  theme: myTheme,
  icons: {
    filter: searchSvg,
  },

  // sticky header
  ...props.gridOptions,
}))

const finalColumnDefs = computed(() => createColumnDefs(props.columnDefs))
const finalRowData = computed(() => props.rowData)
const isLoadingRowData = computed(() => props.loading)

const onGridReady = (event: GridReadyEvent) => {
  emit('gridReady', event)
  gridApi.value = event.api
}

const onCellClicked = (event: CellClickedEvent) => {
  emit('cellClicked', event)
}

const overlayLoadingTemplate = computed(
  () => `
  <div class="flex flex-col justify-center gap-y-3 items-center w-full h-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle size-14 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    <h1 class="text-[#8D8C8C] ml-2 max-w-80">${props.loadingText}</h1>
  </div>
`,
)

const overlayNoRowsTemplate = computed(
  () => `
  <div class="flex flex-col justify-center gap-y-3 items-center w-full h-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloudy-icon lucide-cloudy size-14"><path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/></svg>
    <h1 class="text-[#8D8C8C] ml-2 max-w-80">${props.notFoundDataMessage}</h1>
  </div>
`,
)

const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

const handleResize = () => {
  if (gridApi.value) {
    gridApi.value.sizeColumnsToFit()
  }
}

const debouncedResize = debounce(handleResize, 200)

onMounted(() => {
  window.addEventListener('resize', debouncedResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize)
})
</script>

<template>
  <ag-grid-vue
    class="ag-theme-quartz"
    :column-defs="finalColumnDefs"
    :row-data="finalRowData"
    :grid-options="finalGridOptions"
    :loading="isLoadingRowData"
    :style="{ height: props.height }"
    :overlay-loading-template="overlayLoadingTemplate"
    :overlay-no-rows-template="overlayNoRowsTemplate"
    @grid-ready="onGridReady"
    @cell-clicked="onCellClicked"
  />
</template>
