<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/libs/shadcn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-badge"
    :class="
      cn(
        'border-sidebar-primary mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-1.5',
        'group-data-[collapsible=icon]:hidden',
        props.class,
      )
    "
  >
    <slot />
  </ul>
</template>
