<script setup lang="ts">
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { useGetSession } from '@/modules/login/composable/session'

defineProps<{
  group: string
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    permission: string[] // Array of permissions required to view this item
    items?: {
      permission?: string[] // Optional permissions for sub-items
      title: string
      url: string
    }[]
  }[]
}>()

const route = useRoute()
const pathName = route.path
const { role } = useGetSession()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>
      {{ group }}
    </SidebarGroupLabel>
    <SidebarMenu v-if="items" class="space-y-1.5">
      <template v-for="item in items" :key="item.title">
        <Collapsible
          v-if="item.items"
          as-child
          :default-open="pathName.startsWith(item.url)"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton
                :tooltip="item.title"
                class="group-data-[state=open]/collapsible:text-primary cursor-pointer shadow group-data-[state=open]/collapsible:bg-white"
              >
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubButton
                    as-child
                    class="hover:bg-primary hover:text-white"
                    :class="pathName.startsWith(subItem.url) && 'bg-primary text-white'"
                  >
                    <RouterLink :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </RouterLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <SidebarMenuItem v-else>
          <SidebarMenuButton
            v-if="item.permission && item.permission.includes(role)"
            as-child
            :tooltip="item.title"
            class="hover:bg-primary shadow hover:text-white"
            :class="pathName.startsWith(item.url) && 'bg-primary text-white'"
          >
            <RouterLink :to="item.url" class="flex w-full items-center gap-2">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
