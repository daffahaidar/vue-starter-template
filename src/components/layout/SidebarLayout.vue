<script lang="ts">
export const description = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import AppSidebar from '../section/sidebar/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetSession } from '@/modules/login/composable/session'
import { useAuthStore } from '@/modules/login/stores/auth'
import { useRouter } from 'vue-router'

interface BreadcrumbItem {
  name: string
  path?: string
}

const props = defineProps<{
  pageTitle?: string
  breadcrumb?: BreadcrumbItem[]
}>()

const breadcrumb = props.breadcrumb ?? []

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const router = useRouter()
const { logout } = useAuthStore()
const { name } = useGetSession()

const handleLogout = () => {
  logout()
  // Redirect to login page or perform any other action after logout
  router.push('/')
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <div class="sticky top-0 z-20 rounded-bl px-2 pt-2.5">
        <header
          :class="[
            'bg-sidebar border-border shadow-border flex h-14 shrink-0 items-center gap-2 rounded-sm border-1 shadow transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12',
          ]"
        >
          <div class="flex w-full items-center justify-between px-4.5">
            <div class="flex items-center gap-2">
              <SidebarTrigger class="-ml-1" />
              <Separator orientation="vertical" class="h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <template v-for="(item, index) in breadcrumb" :key="index">
                    <BreadcrumbItem v-if="item.path" class="hidden md:block">
                      <BreadcrumbLink :href="item.path" asChild>
                        <RouterLink class="hover:text-primary text-black" :to="item.path">{{
                          item.name
                        }}</RouterLink>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem v-else class="hidden md:block">
                      <BreadcrumbPage
                        :class="index === breadcrumb.length - 1 ? 'text-primary' : 'text-black'"
                        >{{ item.name }}</BreadcrumbPage
                      >
                    </BreadcrumbItem>

                    <BreadcrumbSeparator
                      class="hidden md:block"
                      v-if="index < breadcrumb.length - 1"
                    />
                  </template>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="outline"
                  class="rounded-full pl-0.5"
                  :class="!name ? 'pr-0.5' : null"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/56962807?v=4"
                      alt="@daffahaidar"
                    />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  {{ name }}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleLogout">
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
      <section class="px-5 pt-3 pb-10">
        <div class="mb-3 flex items-center justify-between">
          <h1 class="text-2xl font-bold" v-if="props.pageTitle">
            {{ props.pageTitle }}
          </h1>
          <slot name="pageButton" />
        </div>
        <slot />
      </section>
    </SidebarInset>
  </SidebarProvider>
</template>
