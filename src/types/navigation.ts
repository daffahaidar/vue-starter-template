import type { LucideIcon } from 'lucide-vue-next'

export interface NavSubItem {
  title: string
  url: string
  permission?: string[]
}

export interface NavMenuItem {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  permission: string[]
  items?: NavSubItem[]
}

export interface NavGroup {
  group: string
  navMenu: NavMenuItem[]
}
