// import React from 'react'
// import { motion } from 'framer-motion';

// const UserProfile = () => {
  
//     return (
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center cursor-pointer"
//       >
//         <div className="relative">
//           <img 
//             src="https://readymadeui.com/profile_2.webp" 
//             alt="User Profile"
//             className="w-12 h-12 rounded-full border-white" 
//           />
//           <span className="h-3 w-3 rounded-full bg-green-600 border-2 border-white absolute bottom-0 right-0"></span>
//         </div>
//         <div className="ml-4">
//           <p className="text-sm text-indigo-600 font-semibold">John Doe</p>
//           <p className="text-xs text-gray-500 mt-0.5">D.IN Medicine</p>
//         </div>
//       </motion.div>
//     );
  
// }

// export default UserProfile
import { motion } from 'framer-motion';

export function UserProfile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center cursor-pointer"
    >
      <div className="relative">
        <img 
          src="https://readymadeui.com/profile_2.webp" 
          alt="User Profile"
          className="w-12 h-12 rounded-full border-white" 
        />
        <span className="h-3 w-3 rounded-full bg-green-600 border-2 border-white absolute bottom-0 right-0"></span>
      </div>
      <div className="ml-4">
        <p className="text-sm text-indigo-600 font-semibold">John Doe</p>
        <p className="text-xs text-gray-500 mt-0.5">D.IN Medicine</p>
      </div>
    </motion.div>
  );
}