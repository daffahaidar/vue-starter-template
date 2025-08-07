import { BanknoteArrowDown, CreditCard, Database, HandCoins, MonitorCheck } from 'lucide-vue-next'

export const navbarData = [
  {
    group: 'Main Menu',
    navMenu: [
      {
        title: 'Home',
        url: '/',
        icon: Database,
        items: [
          {
            title: 'Dashboard',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    group: 'Boilerplate',
    navMenu: [
      {
        title: 'Penagihan',
        url: '/transaction/inquiries',
        icon: HandCoins,
      },
      {
        title: 'Pembayaran',
        url: '/transaction/payments',
        icon: BanknoteArrowDown,
      },
      {
        title: 'Virtual Account',
        url: '/transaction/virtual-accounts',
        icon: CreditCard,
      },
      {
        title: 'Cek Status Pembayaran',
        url: '/transaction/check-status',
        icon: MonitorCheck,
      },
    ],
  },
]
