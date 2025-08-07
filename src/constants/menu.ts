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
        items: [
          {
            title: 'Bar Chart',
            url: '/chart/bar',
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
      },
    ],
  },
]
