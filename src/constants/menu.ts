import { ChartArea, Table2 } from 'lucide-vue-next'
// semua icon bisa didapatkan dari https://lucide.dev/

export const navbarData = [
  {
    group: 'Sub Menu Template',
    navMenu: [
      {
        title: 'Chart Example',
        url: '/chart',
        icon: ChartArea,
        permission: ['User'],
        items: [
          {
            title: 'Bar Chart',
            url: '/chart/bar',
            permission: ['User', 'Admin'], // Contoh penggunaan permission
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
        permission: ['User'], // Contoh penggunaan permission
      },
    ],
  },
]
