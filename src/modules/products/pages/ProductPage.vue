<script setup lang="ts">
import AgTable from '@/components/ui/ag-grid/AgTable.vue'
import { generateProductColumns } from '../tables/column'
import type { GridReadyEvent } from 'ag-grid-community'
import { computed } from 'vue'
import { useGetProduct } from '../queries/product'

const { data, isPending } = useGetProduct()

const columnData = computed(() => generateProductColumns())
const rowData = computed<unknown[]>(() => (Array.isArray(data.value) ? data.value : []))

const customGridOptions = {
  rowHeight: 40,
  headerHeight: 50,
}

const handleGridReady = (event: GridReadyEvent) => {
  event.api.sizeColumnsToFit()
}
</script>

<template>
  <sidebar-layout
    pageTitle="Products"
    :breadcrumb="[{ name: 'Ag Grid Example' }, { name: 'Products' }]"
  >
    <AgTable
      :row-data="rowData"
      :column-defs="columnData"
      :loading="isPending"
      :grid-options="customGridOptions"
      @grid-ready="handleGridReady"
    />
  </sidebar-layout>
</template>
