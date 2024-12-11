"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiDashboardLine,
  RiFileList2Line,
  RiFileListLine,
  RiNotification3Line,
  RiUser3Line,
  RiQuestionLine,
  RiLogoutCircleRLine,
  RiMenuLine,
  RiCloseLine,
  RiCalendarEventLine,
  RiBarChartFill,
  RiInboxLine,
} from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";

const userMainLinks = [
  { name: "Dashboard", icon: RiDashboardLine, path: "/dashboard/user" },
  { name: "View Schemes", icon: RiFileList2Line, path: "/dashboard/user/viewSchemes" },
  { name: "AI Recommendations", icon: RiFileListLine, path: "/dashboard/user/recommended" },
  { name: "Notifications", icon: RiNotification3Line, path: "/dashboard/user/notification" },
  { name: "Profile", icon: RiUser3Line, path: "/dashboard/user/profile" },
  { name: "Help Center", icon: RiQuestionLine, path: "/dashboard/user/help" }
];

const adminMainLinks = [
  { name: "Dashboard", icon: RiDashboardLine, path: "/dashboard/admin" },
  { name: "View Schemes", icon: RiFileList2Line, path: "/dashboard/admin/viewSchemes" },
  { name: "Visual Representation", icon: RiBarChartFill, path: "/dashboard/admin/visualRepresentation" },
  { name: "AI Recommendations", icon: RiFileListLine, path: "/dashboard/admin/recommended" },
  { name: "Events", icon: RiCalendarEventLine, path: "/dashboard/admin/events" },
  { name: "Inbox", icon: RiInboxLine, path: "/dashboard/admin/inbox" },
  { name: "Profile", icon: RiUser3Line, path: "/dashboard/admin/profile" },
  { name: "Help Center", icon: RiQuestionLine, path: "/dashboard/admin/help" },
];

const bottomLinks = [
  { 
    name: "Logout", 
    icon: RiLogoutCircleRLine, 
    path: "#",
    className: "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
  },
];

interface SidebarProps {
  userType: 'admin' | 'user';
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isLinkActive = (path: string) => pathname === path;
  
  const mainLinks = userType === 'admin' ? adminMainLinks : userMainLinks;

  const handleLinkClick = (item: typeof bottomLinks[0]) => {
    if (item.name === 'Logout') {
      onLogout();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 shadow-lg rounded-lg lg:hidden hover:scale-105 transition-transform duration-200"
      >
        {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Overlay - Only show on mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
            className="fixed lg:hidden inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ 
          x: isOpen ? 0 : -300,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 40
        }}
        className="fixed top-0 left-0 h-screen w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-800/50 z-50 shadow-2xl overflow-hidden"
      >
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="p-6 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center rounded-xl shadow-lg">
            IP
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FinTech</span>
        </motion.div>

        {/* User Profile */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="px-4 mb-6"
        >
          <div className="group flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-4 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              {userType === 'admin' ? 'AD' : 'JD'}
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <h3 className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {userType === 'admin' ? 'Admin User' : 'John Doe'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {userType === 'admin' ? 'Administrator' : 'D.IN Medicine'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Navigation Links */}
        <nav className="px-4 flex flex-col h-[calc(100vh-200px)] justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            {mainLinks.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl relative group transition-all duration-300 ease-in-out ${
                      isLinkActive(item.path)
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                        : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 hover:scale-105"
                    }`}
                  >
                    {/* Hover animation */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isLinkActive(item.path) ? 1 : 0.97,
                      }}
                      whileHover={{ scale: 1 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Icon */}
                    <div className={`relative z-10 transition-colors duration-300 ${
                      isLinkActive(item.path) 
                        ? "text-white" 
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    }`}>
                      <item.icon size={20} />
                    </div>

                    {/* Label */}
                    <span className={`relative z-10 font-medium transition-colors duration-300 ${
                      isLinkActive(item.path)
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 mb-6"
          >
            {bottomLinks.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div
                  onClick={() => handleLinkClick(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl relative group transition-all duration-300 ease-in-out cursor-pointer
                    ${item.className || ''} 
                    ${isLinkActive(item.path)
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                      : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 hover:scale-105"
                    }`}
                >
                  {/* Icon */}
                  <div className={`relative z-10 transition-colors duration-300`}>
                    <item.icon size={20} />
                  </div>

                  {/* Label */}
                  <span className={`relative z-10 font-medium transition-colors duration-300`}>
                    {item.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.3);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(156, 163, 175, 0.5);
          }
        `}</style>
      </motion.div>
    </>
  );
};

export default Sidebar;