export type MenuItemId = 'menu' | 'docs' | 'home' | 'bonus' | 'profile' | 'marketplace';

export interface MenuItem {
  id: MenuItemId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}
