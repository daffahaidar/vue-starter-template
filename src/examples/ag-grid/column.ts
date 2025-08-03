import type { ColDef } from 'ag-grid-community'
import CustomComponent from './CustomComponent.vue'

export const generateProductColumns = (): ColDef[] => [
  {
    field: 'name',
    headerName: 'Nama Produk',
    filter: 'agTextColumnFilter',
    cellRenderer: CustomComponent,
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
  },
  {
    field: 'stock_quantity',
    headerName: 'Stok',
    filter: 'agNumberColumnFilter',
  },
]
