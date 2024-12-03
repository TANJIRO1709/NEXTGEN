import React, { useState } from 'react';
import { AiOutlineClose, AiFillExclamationCircle } from 'react-icons/ai';

const LogoutModal = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control modal visibility
 // React Router hook for navigation

  const handleClose = () => {
    setIsVisible(false); // Close the modal
  };

  const handleLogout = () => {
     // Redirect to the home page
  };

  if (!isVisible) return null; // Don't render if modal is not visible

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
        {/* Close Button */}
        <AiOutlineClose
          className="w-4 h-4 cursor-pointer fill-gray-400 hover:fill-red-500 float-right"
          role="button"
          onClick={handleClose} // Close the modal on click
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
            onClick={handleClose} // Close the modal on click
            className="px-5 py-2.5 rounded-lg w-full tracking-wide text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout} // Navigate to home page on click
            className="px-5 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600"
          >
            Yes, I'm Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
