import { IconType } from 'react-icons';

export interface NavItem {
  icon: IconType;
  label: string;
  path: string;
}

export interface NavigationConfig {
  mainNavItems: NavItem[];
  bottomNavItems: NavItem[];
}