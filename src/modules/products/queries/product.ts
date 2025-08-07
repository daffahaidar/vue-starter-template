import { useQuery } from '@tanstack/vue-query' // Import useQuery dari Vue Query untuk melakukan query data ke server
// import { api } from '@/libs/axios' // Import instance axios yang telah dikonfigurasi
// import { endpoint } from '@/api' // Import endpoint yang berisi URL API
import { dummyProductData } from '../data/dummy'
import type { AxiosResponse } from 'axios'

export const useGetProduct = () => {
  const {
    isPending, // Indikator apakah fetch data sedang dalam proses
    isError, // Indikator apakah terjadi error pada saat data fetching
    isFetching, // Indikator apakah data sedang di-fetching
    data, // Data yang didapat dari backend
    error, // Error yang terjadi saat fetching data
    refetch, // Fungsi untuk melakukan refetch data
  } = useQuery({
    queryKey: ['get-products'], // key untuk query ini, digunakan untuk caching dan invalidation (nama bebas pisahkan dengan '-' jika ada 2 kata)
    queryFn: async () => {
      try {
        const response = new Promise<AxiosResponse>((resolve) => {
          setTimeout(() => {
            resolve({
              data: dummyProductData, // Menggunakan data dummy sebagai contoh
              status: 200,
              statusText: 'OK',
            } as AxiosResponse)
          }, 1000)
        })

        return (await response).data
        // Contoh jika ingin melakukan request ke backend
        // const response = await api.get(endpoint.exampleEndpoint)
        // return response?.data.data
      } catch (error: unknown) {
        // Jika terjadi error, lempar error tersebut
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
