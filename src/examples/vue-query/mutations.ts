import { useMutation } from '@tanstack/vue-query'
import { api } from '@/libs/axios'
import { endpoint } from '@/api'
import type { AxiosError, AxiosResponse } from 'axios'

interface RequestBody {
  name: string
  price: number
  description: string
  stock_quantity: number
}

export const useCreateProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AxiosResponse) => void
  onError?: (error: AxiosError) => void
}) => {
  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: async (body: RequestBody) => {
      const response = await api.post(endpoint.createProduct, body)
      return response
    },
    onSuccess,
    onError,
  })
}

export const useUpdateProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AxiosResponse) => void
  onError?: (error: AxiosError) => void
}) => {
  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: async ({ id, ...body }: { id: string } & RequestBody) => {
      const response = await api.patch(`${endpoint.updateProduct}/${id}`, body)
      return response
    },
    onSuccess,
    onError,
  })
}

export const useDeleteProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AxiosResponse) => void
  onError?: (error: AxiosError) => void
}) => {
  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: async (id: string) => {
      const response = await api.delete(`${endpoint.deleteProduct}/${id}`)
      return response
    },
    onSuccess,
    onError,
  })
}
