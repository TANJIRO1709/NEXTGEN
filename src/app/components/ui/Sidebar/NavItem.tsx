'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { NavItem as NavItemType } from './navigationConfig';
import { AiOutlineClose, AiFillExclamationCircle } from 'react-icons/ai';

interface NavItemProps extends NavItemType {
  isActive: boolean;
}

export function NavItem({ icon: Icon, label, path, isActive }: NavItemProps) {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setLogoutModalOpen(true); // Open the logout modal
  };

  return (
    <>
      <motion.li
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.95 }}
      >
        {label === 'Logout' ? (
          <button
            onClick={handleLogoutClick}
            className={`w-full text-sm flex items-center rounded-md transition-colors ${
              isActive ? 'text-indigo-600 font-semibold bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'
            } px-3 py-2`}
          >
            <Icon className="w-[18px] h-[18px] mr-4" />
            <span>{label}</span>
          </button>
        ) : (
          <Link
            href={path}
            className={`w-full text-sm flex items-center rounded-md transition-colors ${
              isActive ? 'text-indigo-600 font-semibold bg-indigo-50' : 'text-gray-600 hover:text-indigo-600'
            } px-3 py-2`}
          >
            <Icon className="w-[18px] h-[18px] mr-4" />
            <span>{label}</span>
          </Link>
        )}
      </motion.li>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
           <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
           <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
             {/* Close Button */}
             <AiOutlineClose
               className="w-4 h-4 cursor-pointer fill-gray-400 hover:fill-red-500 float-right"
               role="button"
               onClick={()=>{
                setLogoutModalOpen(false)
               }} // Close the modal on click
             />
     
             <div className="my-8 text-center">
               {/* Warning Icon */}
               <AiFillExclamationCircle className="w-14 h-14 text-red-500 inline" />
     
               <h4 className="text-lg text-gray-800 font-semibold mt-6">
                 You will be logged out from this session!
               </h4>
               <p className="text-sm text-gray-500 mt-2">Are you sure to proceed?</p>
             </div>
     
             <div className="flex max-sm:flex-col gap-4">
               <button
                 type="button"
                 onClick={()=>{
                  setLogoutModalOpen(false)
                 }} // Close the modal on click
                 className="px-5 py-2.5 rounded-lg w-full tracking-wide text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300"
               >
                 Cancel
               </button>
               <button
                 type="button"
                 onClick={()=>{
                  setLogoutModalOpen(false)
                 }} // Navigate to home page on click
                 className="px-5 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600"
               >
                 Yes, I'm Sure
               </button>
             </div>
           </div>
         </div>
      )}
    </>
  );
}
