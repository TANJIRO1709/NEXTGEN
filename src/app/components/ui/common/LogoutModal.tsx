'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineClose, AiFillExclamationCircle } from 'react-icons/ai';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'react-hot-toast';

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Call backend to clear the cookie
      const response = await fetch('http://localhost:4000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Use the logout function from AuthContext
        logout();
        
        // Close the modal
        onClose();
        
        // Show success message
        toast.success('Logged out successfully');
        
        // Redirect to home page
        router.push('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
        {/* Close Button */}
        <AiOutlineClose
          className="w-4 h-4 cursor-pointer fill-gray-400 hover:fill-red-500 float-right"
          role="button"
          onClick={onClose}
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
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg w-full tracking-wide text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
