import { useQuery } from '@tanstack/vue-query' // Import useQuery dari Vue Query untuk melakukan query data ke server
import { api } from '@/libs/axios' // Import instance axios yang telah dikonfigurasi
import { endpoint } from '@/api' // Import endpoint yang berisi URL API
import type { ComputedRef } from 'vue'
import type { DateValue } from 'reka-ui'

export function queryProduct(
  accessToken: string | undefined, // Token akses untuk otentikasi API
  category: ComputedRef<string | null>,
  arrivalDateStart: ComputedRef<string | DateValue | null>,
  arrivalDateEnd: ComputedRef<string | DateValue | null>,
) {
  return {
    queryKey: ['get-products', category, arrivalDateStart, arrivalDateEnd], // key untuk query ini, digunakan untuk caching dan invalidation (nama bebas pisahkan dengan '-' jika ada 2 kata)
    queryFn: async () => {
      try {
        const response = await api.get(endpoint.getProduct, {
          params: {
            category: category.value, // Mengambil nilai kategori dari computed ref
            arrivalDateStart: arrivalDateStart.value, // Mengambil nilai tanggal mulai kedatangan dari computed ref
            arrivalDateEnd: arrivalDateEnd.value, // Mengambil nilai tanggal akhir kedatangan dari computed ref
          },
          headers: {
            Authorization: `Bearer ${accessToken}`, // Menambahkan token akses ke header untuk otentikasi
          },
        })
        return response?.data.data
      } catch (error) {
        throw error
      }
    },
  }
}

export const useGetProduct = (
  accessToken: string | undefined,
  category: ComputedRef<string | null>,
  arrivalDateStart: ComputedRef<string | DateValue | null>,
  arrivalDateEnd: ComputedRef<string | DateValue | null>,
) => {
  const {
    isPending, // Indikator apakah fetch data sedang dalam proses
    isError, // Indikator apakah terjadi error pada saat data fetching
    isFetching, // Indikator apakah data sedang di-fetching
    data, // Data yang didapat dari backend
    error, // Error yang terjadi saat fetching data
    refetch, // Fungsi untuk melakukan refetch data
  } = useQuery({
    ...queryProduct(accessToken, category, arrivalDateStart, arrivalDateEnd),
  })
  return {
    isPending,
    isError,
    isFetching,
    data,
    error,
    refetch,
  }
}
