export type MenuItemId = 'docs' | 'bonus' | 'info' | 'profile';

export interface MenuItem {
  id: MenuItemId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}
