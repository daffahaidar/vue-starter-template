<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { navbarData } from '@/constants/menu'
import NavMenu from '@/components/section/sidebar/NavMenu.vue'
import NavHeader from '@/components/section/sidebar/NavHeader.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
</script>

<template>
  <Sidebar v-bind="props" variant="floating" collapsible="offcanvas">
    <SidebarHeader>
      <NavHeader />
    </SidebarHeader>
    <SidebarContent>
      <NavMenu v-for="(item, i) in navbarData" :key="i" :items="item.navMenu" :group="item.group" />
    </SidebarContent>
    <SidebarFooter>
      <div class="flex items-center gap-2 justify-center text-primary">
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
          class="lucide size-10 lucide-component-icon lucide-component"
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
        <h1 class="text-xl font-bold">Company Logo</h1>
      </div>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
