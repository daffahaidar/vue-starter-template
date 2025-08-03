import { useQuery } from '@tanstack/vue-query'
import { api } from '@/libs/axios'
import { endpoint } from '@/api'

export const useGetProduct = () => {
  const { isPending, isError, isFetching, data, error, refetch } = useQuery({
    queryKey: ['get-products'],
    queryFn: async () => {
      try {
        const response = await api.get(endpoint.product)
        return response?.data.data
      } catch (error: unknown) {
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
