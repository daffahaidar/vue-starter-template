import { useQuery } from '@tanstack/vue-query' // Import useQuery dari Vue Query untuk melakukan query data ke server
import { api } from '@/libs/axios' // Import instance axios yang telah dikonfigurasi
import { endpoint } from '@/api'

export const useGetCategories = () => {
  const {
    isPending, // Indikator apakah fetch data sedang dalam proses
    isError, // Indikator apakah terjadi error pada saat data fetching
    isFetching, // Indikator apakah data sedang di-fetching
    data, // Data yang didapat dari backend
    error, // Error yang terjadi saat fetching data
    refetch, // Fungsi untuk melakukan refetch data
  } = useQuery({
    queryKey: ['get-categories'], // key untuk query ini, digunakan untuk caching dan invalidation (nama bebas pisahkan dengan '-' jika ada 2 kata)
    queryFn: async () => {
      try {
        const response = await api.get(endpoint.getCategories)
        return response?.data.data
      } catch (error) {
        throw error
      }
    },
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
