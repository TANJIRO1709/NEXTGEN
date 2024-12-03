'use client';
import React, { useState, useEffect, useRef } from 'react';
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const links = [
  { val: "Home", link: '#home' },
  { val: "About Us", link: '#about' },
  { val: "Features", link: '#features' },
  { val: "Schemes", link: '#schemes' },
  { val: "FAQ", link: '#faq' },
];

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here.
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white max-w-full sticky top-0 h-16 shadow-md flex items-center justify-between px-6 lg:px-10 z-10">
      {/* Logo Section */}
      <a href='/'>
        <div className="flex justify-center items-center gap-2 text-[#0D83FD]">
          <BsGlobeCentralSouthAsia className="font-bold text-4xl lg:text-5xl" />
          <h1 className="text-2xl lg:text-3xl font-bold">FinTech</h1>
        </div>
      </a>

      {/* Desktop Menu */}
      {!isLoggedIn && (
        <div className="hidden lg:flex justify-center items-center gap-8 text-[16px] font-light opacity-90">
          {links.map((l) => (
            <a
              key={l.link}
              href={l.link}
              className="hover:text-[#0D83FD] hover:scale-105 transition-all duration-300"
            >
              {l.val}
            </a>
          ))}
        </div>
      )}

      {/* Mobile Menu Button */}
      {!isLoggedIn && (
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMobileMenuOpen ? (
                <HiX className="text-3xl text-[#0D83FD]" />
              ) : (
                <HiMenuAlt3 className="text-3xl text-[#0D83FD]" />
              )}
            </motion.div>
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-[90%] max-w-sm z-50 flex flex-col gap-4 text-center"
          >
            {links.map((l) => (
              <a
                key={l.link}
                href={l.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg hover:text-[#0D83FD]"
              >
                {l.val}
              </a>
            ))}
            <Button
              className="bg-[#0D83FD] hover:bg-[#3195FD] text-white text-[17px] w-full py-2 mt-2"
              variant="outline"
              onClick={handleLoginRedirect}
            >
              Login
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post-Login Navbar */}
      {isLoggedIn && (
        <div className="hidden lg:flex items-center gap-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 px-4 py-2 bg-transparent border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-[#0D83FD] focus:border-[#0D83FD]"
          />
          <FiBell className="text-2xl text-gray-700 cursor-pointer hover:text-[#0D83FD]" />
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0D83FD] text-white"
            >
              P
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-40">
                <button
                  onClick={handleLogout}
                  className="text-left w-full px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Button for Desktop */}
      {!isLoggedIn && (
        <Button
          className="hidden rounded-3xl lg:block text-center bg-[#0D83FD] hover:bg-[#3195FD] px-8 text-white text-[17px]"
          variant="outline"
          onClick={handleLoginRedirect}
        >
          Login
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
