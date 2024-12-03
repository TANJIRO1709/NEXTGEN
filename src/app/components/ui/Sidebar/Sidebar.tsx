// "use client";
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import { 
//   RiDashboardLine, 
//   RiLineChartLine, 
//   RiTeamLine, 
//   RiProductHuntLine,
//   RiMailLine,
//   RiQuestionLine,
//   RiLogoutBoxLine 
// } from 'react-icons/ri';
// import UserProfile from './UserProfile';
// import SearchBar from './SearchBar';
// import NavItem from './NavItem';

// const mainNavItems = [
//   { icon: RiDashboardLine, label: 'Dashboard',goto:'/dashboard/user' },
//   { icon: RiLineChartLine, label: 'Insight', goto: '/dashboard/user/insight'},
//   { icon: RiTeamLine, label: 'People & Terms',goto: '/dashboard/user/terms' },
//   { icon: RiProductHuntLine, label: 'Product',goto: '/dashboard/user/product' },
//   { icon: RiMailLine, label: 'Inbox',goto: '/dashboard/user/inbox', },
// ];

// const bottomNavItems = [
//   { icon: RiQuestionLine, label: 'Help Center',goto: '/dashboard/user/contact' },
//   { icon: RiLogoutBoxLine, label: 'Logout',goto: '/dashboard/user'},
// ];

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState('Dashboard');

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
//       >
//         {isOpen ? <X /> : <Menu />}
//       </button>

//       {/* Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={toggleSidebar}
//             className="lg:hidden fixed inset-0 bg-black/50 z-40"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <nav
//         className={`bg-white shadow-lg fixed top-16 left-0 h-screen w-[250px] py-6 px-6 z-50`}
//       >
//         <UserProfile />
//         <SearchBar />

//         <ul className="space-y-2 mt-8">
//           {mainNavItems.map((item) => (
//             <NavItem
//               key={item.label}
//               icon={item.icon}
//               label={item.label}
//               goto={item.goto}
//               isActive={activeItem === item.label}
//               onClick={() => setActiveItem(item.label)}
//             />
//           ))}
//         </ul>

//         <ul className="space-y-2 mt-8">
//           {bottomNavItems.map((item) => (
//             <NavItem
//               key={item.label}
//               icon={item.icon}
//               label={item.label}
//               isActive={activeItem === item.label}
//               onClick={() => setActiveItem(item.label)}
//             />
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// }

// export default Sidebar;
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserProfile } from './UserProfile';
import { SearchBar } from './SearchBar';
import { NavItem } from './NavItem';
import { navigationConfig } from './navigation';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      <nav
         className={`bg-white shadow-lg fixed top-16 left-0 h-screen w-[250px] py-6 px-6 z-50`}
       >
        <UserProfile />
        <SearchBar />

        <ul className="space-y-2 mt-8">
          {navigationConfig.mainNavItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              isActive={pathname === item.path}
            />
          ))}
        </ul>

        <ul className="space-y-2 mt-8">
          {navigationConfig.bottomNavItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              isActive={pathname === item.path}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}