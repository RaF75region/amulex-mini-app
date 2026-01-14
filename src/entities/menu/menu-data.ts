import { MenuItem } from '@/shared/types/menu';
import { DocsIcon, CryptoIcon, ChatIcon, ProfileIcon } from '@/shared/ui/icons';

export const menuItems: MenuItem[] = [
  {
    id: 'menu',
    label: 'Меню',
    icon: DocsIcon,
    route: '/docs',
  },
  {
    id: 'docs',
    label: 'Документы',
    icon: DocsIcon,
    route: '/docs',
  },
  {
    id: 'home',
    label: 'Главная',
    icon: ChatIcon,
    route: '/',
  },
  {
    id: 'bonus',
    label: 'Бонусы',
    icon: CryptoIcon,
    route: '/bonus',
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: ProfileIcon,
    route: '/profile',
  },
];
