import { useQueryClient } from '@tanstack/vue-query'

export default function useRevalidateQuery() {
  const queryClient = useQueryClient()

  const revalidate = (queryKeys: string[]) => {
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] })
    })
  }

  return revalidate
}
