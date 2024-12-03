import { 
    RiDashboardLine, 
    RiLineChartLine, 
    RiTeamLine, 
    RiProductHuntLine,
    RiMailLine,
    RiQuestionLine,
    RiLogoutBoxLine 
  } from 'react-icons/ri';
  import { NavigationConfig } from "./navigationConfig";
  
  export const navigationConfig: NavigationConfig = {
    mainNavItems: [
      { icon: RiDashboardLine, label: 'Dashboard', path: '/dashboard/user' },
      { icon: RiLineChartLine, label: 'View Schemes', path: '/dashboard/user/viewSchemes' },
      { icon: RiTeamLine, label: 'Notifications', path: '/dashboard/user/notification' },
      { icon: RiMailLine, label: 'Inbox', path: '/inbox' },
      { icon: RiProductHuntLine, label: 'Profile', path: '/dashboard/user/profile' },
    ],
    bottomNavItems: [
      { icon: RiQuestionLine, label: 'Help Center', path: '/dashboard/user/contact' },
      { icon: RiLogoutBoxLine, label: 'Logout', path: '/dashboard/user' },
    ],
  };