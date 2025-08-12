<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
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
import { useRoute } from 'vue-router'
import { useGetSession } from '@/modules/login/composable/session'
import type { NavMenuItem } from '@/types/navigation'

defineProps<{
  group: string
  items: NavMenuItem[]
}>()

const route = useRoute()
const pathName = route.path
const { role } = useGetSession()

const hasPermission = (permissions: string[]): boolean => {
  return permissions.includes(role.value)
}

const hasSubItemPermission = (items?: NavMenuItem['items']): boolean => {
  if (!items) return false
  return items.some((subItem) => !subItem.permission || hasPermission(subItem.permission))
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>
      {{ group }}
    </SidebarGroupLabel>
    <SidebarMenu v-if="items" class="space-y-1.5">
      <template v-for="item in items" :key="item.title">
        <!-- Item dengan sub-menu -->
        <Collapsible
          v-if="item.items && hasPermission(item.permission) && hasSubItemPermission(item.items)"
          as-child
          :default-open="
            item.url
              ? pathName.startsWith(item.url)
              : item.items.some((subItem) => pathName.startsWith(subItem.url))
          "
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
                <template v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubItem
                    v-if="!subItem.permission || hasPermission(subItem.permission)"
                  >
                    <SidebarMenuSubButton
                      as-child
                      class="hover:bg-primary hover:text-white"
                      :class="pathName.startsWith(subItem.url) && 'bg-primary text-white'"
                    >
                      <router-link :to="subItem.url">
                        <span>{{ subItem.title }}</span>
                      </router-link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </template>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <!-- Item tanpa sub-menu -->
        <SidebarMenuItem v-else-if="!item.items && item.url && hasPermission(item.permission)">
          <SidebarMenuButton
            as-child
            :tooltip="item.title"
            class="hover:bg-primary shadow hover:text-white"
            :class="pathName.startsWith(item.url) && 'bg-primary text-white'"
          >
            <router-link :to="item.url" class="flex w-full items-center gap-2">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
