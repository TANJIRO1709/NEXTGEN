'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import LogoutModal from './LogoutModal';
import { useAuth } from '@/app/context/AuthContext';

interface Notification {
  id: string;
  type: 'inbox' | 'notification';
  title: string;
  sender: string;
  senderImage: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'inbox',
    title: 'Food App IOS & Android - Need confirmation',
    sender: 'Pepper Potts',
    senderImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s',
    content: 'Hi Team, I hope this email finds you well. We are ready to begin the development of the Food App for both iOS and Android platforms...',
    timestamp: '11:50 AM',
    read: false,
    starred: false,
  },
  // ... other notifications
];

const links = [
  { val: "Home", link: '#home' },
  { val: "About Us", link: '#about' },
  { val: "Features", link: '#features' },
  { val: "Schemes", link: '#schemes' },
  { val: "FAQ", link: '#faq' },
];

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const router = useRouter();
  const pathname = usePathname();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    // You can add your search logic here
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  const hasUnreadNotifications = notifications.some(notification => !notification.read);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setIsProfileMenuOpen(false);
  };

  const handleProfileRedirect = () => {
    router.push('/dashboard/user/profile');
    setIsProfileMenuOpen(false);
  };

  const handleNotificationRedirect = () => {
    router.push('/dashboard/user/notification');
  };

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          isScrolled || isLoggedIn
            ? 'bg-white/95 backdrop-blur-lg shadow-md'
            : 'bg-white/98'
        }`}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isLoggedIn ? 'lg:pl-64' : 'max-w-7xl'}`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo Section - Only show when not logged in */}
            {!isLoggedIn && (
              <motion.a
                href='/'
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2 text-[#0D83FD]">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <BsGlobeCentralSouthAsia className="relative font-bold text-4xl lg:text-5xl" />
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-clip-text">NEXTGEN</h1>
                </div>
              </motion.a>
            )}

            {/* Desktop Menu - Only show on non-auth pages when not logged in */}
            {!isLoggedIn && !isAuthPage && (
              <div className="hidden md:flex items-center justify-center flex-1">
                <div className="flex items-center gap-1">
                  {links.map((item) => (
                    <motion.a
                      key={item.val}
                      href={item.link}
                      className="px-4 py-2 text-gray-600 hover:text-[#0D83FD] rounded-lg hover:bg-blue-50 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.val}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {/* Right side navigation items */}
            <div className={`flex items-center justify-end ${isLoggedIn ? 'w-full' : ''}`}>
              {isLoggedIn ? (
                <div className="flex items-center justify-between w-full">
                  {/* Search Bar */}
                  <form onSubmit={handleSearch} className="flex-1 max-w-5xl mx-4">
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search anything..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0D83FD] focus:ring-2 focus:ring-[#0D83FD]/20 transition-all"
                      />
                      <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0D83FD] text-xl" />
                    </div>
                  </form>
                  
                  {/* Navigation Icons */}
                  <div className="flex items-center gap-4">
                    {/* Notification Icon */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNotificationRedirect}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                    >
                      <FiBell className="text-2xl text-[#0D83FD]" />
                      {hasUnreadNotifications && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </motion.button>

                    {/* Profile Menu */}
                    <div className="relative" ref={profileMenuRef}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <FaUser className="text-xl text-[#0D83FD]" />
                      </motion.button>
                      <AnimatePresence>
                        {isProfileMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1.5 border border-gray-100 overflow-hidden z-50"
                          >
                            <button
                              onClick={handleProfileRedirect}
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#0D83FD] transition-colors flex items-center gap-2"
                            >
                              <FaUser className="text-sm" />
                              <span>Profile</span>
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#0D83FD] transition-colors flex items-center gap-2"
                            >
                              <HiX className="text-sm" />
                              <span>Logout</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ) : !isAuthPage && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoginRedirect}
                  className="px-6 py-2 bg-[#0D83FD] text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Login
                </motion.button>
              )}
            </div>

            {/* Mobile menu button - Only show when not logged in */}
            {!isLoggedIn && !isAuthPage && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <HiX className="text-2xl text-gray-600" />
                ) : (
                  <HiMenuAlt3 className="text-2xl text-gray-600" />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !isLoggedIn && !isAuthPage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-white shadow-lg md:hidden z-30 border-t"
          >
            <div className="p-4 space-y-2">
              {links.map((item) => (
                <motion.a
                  key={item.val}
                  href={item.link}
                  className="block px-4 py-2 text-gray-600 hover:text-[#0D83FD] rounded-lg hover:bg-blue-50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.val}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginRedirect}
                className="w-full px-4 py-2 mt-2 bg-[#0D83FD] text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} />
      )}
    </>
  );
};

export default Navbar;
