import type { ColDef } from 'ag-grid-community'
import TableNavigator from '../components/TableNavigator.vue'
import { toRupiah } from '@/utils/currency'

export const generateProductColumns = (): ColDef[] => [
  {
    field: 'name',
    headerName: 'Nama Produk',
    filter: 'agTextColumnFilter',
    cellRenderer: TableNavigator,
    filterValueGetter: (params) => params.data.name,
  },
  {
    field: 'description',
    headerName: 'Deskripsi',
    filter: 'agTextColumnFilter',
  },
  {
    field: 'price',
    headerName: 'Harga Produk',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => toRupiah(params.value),
  },
  {
    field: 'stock_quantity',
    headerName: 'Stok',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) =>
      params.value > 50 ? `${params.value} pcs` : `${params.value} pcs (Low Stock)`,
  },
]
