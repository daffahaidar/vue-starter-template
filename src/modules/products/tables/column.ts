import type { ColDef } from 'ag-grid-community'
import { toRupiah } from '@/utils/currency'
import { dateFormatter } from '@/utils/date'

export const generateProductColumns = (): ColDef[] => [
  {
    field: 'name',
    headerName: 'Nama Produk',
    filter: 'agTextColumnFilter',
    filterValueGetter: (params) => params.data.name,
    cellStyle: (params) => {
      // Styling khusus untuk row total
      if (params.node.rowPinned === 'bottom') {
        return {
          backgroundColor: '#f8f9fa',
          fontWeight: 'bold',
          borderTop: '2px solid #dee2e6',
        }
      }
      return null
    },
  },
  {
    field: 'description',
    headerName: 'Deskripsi',
    filter: 'agTextColumnFilter',
    cellStyle: (params) => {
      if (params.node.rowPinned === 'bottom') {
        return {
          backgroundColor: '#f8f9fa',
          borderTop: '2px solid #dee2e6',
        }
      }
      return null
    },
  },
  {
    field: 'arrival_date',
    headerName: 'Tanggal Masuk',
    filter: 'agTextColumnFilter',
    filterValueGetter: (params) => dateFormatter(params.data.arrival_date),
    valueFormatter: (params) => {
      if (params.node && params.node.rowPinned === 'bottom') {
        return '' // Kosongkan untuk row total
      }
      return dateFormatter(params.value)
    },
    cellStyle: (params) => {
      if (params.node.rowPinned === 'bottom') {
        return {
          backgroundColor: '#f8f9fa',
          borderTop: '2px solid #dee2e6',
        }
      }
      return null
    },
  },
  {
    field: 'price',
    headerName: 'Harga Produk',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => {
      if (params.node && params.node.rowPinned === 'bottom') {
        return '' // Kosongkan untuk row total
      }
      return toRupiah(params.value)
    },
    cellStyle: (params) => {
      if (params.node.rowPinned === 'bottom') {
        return {
          backgroundColor: '#f8f9fa',
          borderTop: '2px solid #dee2e6',
        }
      }
      return null
    },
  },
  {
    field: 'category.name',
    headerName: 'Kategori',
    filter: 'agTextColumnFilter',
    cellStyle: (params) => {
      if (params.node.rowPinned === 'bottom') {
        return {
          backgroundColor: '#f8f9fa',
          borderTop: '2px solid #dee2e6',
        }
      }
      return null
    },
  },
  {
    field: 'stock_quantity',
    headerName: 'Stok',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => {
      if (params.node && params.node.rowPinned === 'bottom') {
        return `${params.value} pcs` // Format khusus untuk row total
      }
      return params.value > 50 ? `${params.value} pcs` : `${params.value} pcs (Low Stock)`
    },
    cellStyle: (params) => {
      if (params.node.rowPinned === 'bottom') {
        return {
          backgroundColor: '#f8f9fa',
          fontWeight: 'bold',
          borderTop: '2px solid #dee2e6',
        }
      }
      return null
    },
  },
]
