<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/shadcn'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import BlankImage from '@/assets/images/blank-image.png'
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'vue-sonner'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useLogin } from '../mutations/login'
import type { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const router = useRouter()

const { login: saveCredentials } = useAuthStore()

const loginSchema = toTypedSchema(
  z.object({
    email: z.string({ required_error: 'Email harus diisi!' }),
    password: z.string({ required_error: 'Password harus diisi!' }),
  }),
)

const form = useForm({
  validationSchema: loginSchema,
})

const { mutate: login, isPending: isLoadingLogin } = useLogin({
  onSuccess: (response) => {
    console.log('Login response:', response.data.email)
    toast.success('Login berhasil!')
    saveCredentials({
      email: response.data.email,
    })
    // Redirect ke halaman dashboard atau halaman yang diinginkan
    router.push('/ag-grid-example/products')
  },

  onError: (error: AxiosError) => {
    toast.error(error.message)
  },
})

const onSubmit = form.handleSubmit((values) => {
  login({
    email: values.email,
    password: values.password,
  })
})
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="overflow-hidden p-0">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form @submit="onSubmit" class="p-6 md:p-8">
          <div class="flex flex-col gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide size-10 lucide-component-icon lucide-component mx-auto w-24 dark:brightness-[0.2] dark:grayscale"
            >
              <path
                d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
              />
              <path
                d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"
              />
              <path
                d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"
              />
              <path
                d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
              />
            </svg>
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Login Company</h1>
              <p class="text-muted-foreground text-balance">Silakan masuk untuk melanjutkan</p>
            </div>
            <div class="grid gap-3">
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel> Email </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Masukkan email Anda" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="grid gap-3">
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <div class="flex items-center">
                    <FormLabel> Password </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan password Anda"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <Button
              type="submit"
              class="w-full"
              :loading="isLoadingLogin"
              :disabled="isLoadingLogin"
            >
              Login
            </Button>

            <div class="text-muted-foreground text-center text-sm">
              &copy; {{ new Date().getFullYear() }} Your Company <br />All rights reserved.
            </div>
          </div>
        </form>
        <div class="bg-muted relative hidden md:block">
          <img
            :src="BlankImage"
            alt="Login Banner"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
