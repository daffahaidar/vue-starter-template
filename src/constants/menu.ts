import { ChartArea, Table2 } from 'lucide-vue-next'
import type { NavGroup } from '@/types/navigation'

export const navbarData: NavGroup[] = [
  {
    group: 'Sub Menu Template',
    navMenu: [
      {
        title: 'Chart Example',
        icon: ChartArea,
        permission: ['User', 'Admin'],
        items: [
          {
            title: 'Bar Chart',
            url: '/chart/bar',
            permission: ['User', 'Admin'],
          },
        ],
      },
    ],
  },
  {
    group: 'Main Menu Template',
    navMenu: [
      {
        title: 'Ag Grid Example',
        url: '/ag-grid-example/products',
        icon: Table2,
        permission: ['User', 'Admin'],
      },
    ],
  },
]
