<script setup lang="ts">
import LoginForm from '@/modules/login/components/LoginForm.vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <section class="flex min-h-dvh items-center justify-center px-5">
    <Alert
      class="w-fit grid grid-cols-2 absolute left-1/2 top-10 -translate-x-1/2 gap-10 animate-pulse"
    >
      <div>
        <AlertTitle>Email</AlertTitle>
        <AlertDescription>admin@example.com</AlertDescription>
      </div>
      <div>
        <AlertTitle>Password</AlertTitle>
        <AlertDescription>example123</AlertDescription>
      </div>
    </Alert>
    <LoginForm class="w-2xl" />
  </section>
</template>
