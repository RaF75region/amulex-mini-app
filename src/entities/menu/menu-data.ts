import { MenuItem } from '@/shared/types/menu';
import { DocsIcon, CryptoIcon, ChatIcon, ProfileIcon } from '@/shared/ui/icons';

export const menuItems: MenuItem[] = [
  {
    id: 'docs',
    label: 'Документы',
    icon: DocsIcon,
    route: '/docs',
  },
  {
    id: 'bonus',
    label: 'Бонусы',
    icon: CryptoIcon,
    route: '/bonus',
  },
  {
    id: 'info',
    label: 'Инфо',
    icon: ChatIcon,
    route: '/info',
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: ProfileIcon,
    route: '/profile',
  },
];
