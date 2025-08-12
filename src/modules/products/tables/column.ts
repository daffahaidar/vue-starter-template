import type { ColDef } from 'ag-grid-community'
import { toRupiah } from '@/utils/currency'
import { dateFormatter } from '@/utils/date'

export const generateProductColumns = (): ColDef[] => [
  {
    field: 'name',
    headerName: 'Nama Produk',
    filter: 'agTextColumnFilter',
    filterValueGetter: (params) => params.data.name,
  },
  {
    field: 'description',
    headerName: 'Deskripsi',
    filter: 'agTextColumnFilter',
  },
  {
    field: 'arrival_date',
    headerName: 'Tanggal Masuk',
    filter: 'agTextColumnFilter',
    filterValueGetter: (params) => dateFormatter(params.data.arrival_date),
    valueFormatter: (params) => dateFormatter(params.value),
  },
  {
    field: 'price',
    headerName: 'Harga Produk',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => toRupiah(params.value),
  },
  {
    field: 'category.name',
    headerName: 'Kategori',
    filter: 'agTextColumnFilter',
  },
  {
    field: 'stock_quantity',
    headerName: 'Stok',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) =>
      params.value > 50 ? `${params.value} pcs` : `${params.value} pcs (Low Stock)`,
  },
]
