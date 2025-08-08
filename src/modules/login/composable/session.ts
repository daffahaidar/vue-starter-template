import { useAuthStore } from '@/modules/login/stores/auth'
import { computed } from 'vue'

export const useGetSession = () => {
  const auth = useAuthStore()
  const name = computed(() => auth.name)
  const email = computed(() => auth.email)
  const accessToken = computed(() => auth.accessToken)
  const accessTokenExpireIn = computed(() => auth.accessTokenExpireIn)
  const refreshToken = computed(() => auth.refreshToken)
  const role = computed(() => auth.role)

  return {
    isLoggedIn: auth.isLoggedIn,
    name,
    email,
    accessToken,
    accessTokenExpireIn,
    refreshToken,
    role,
  }
}
