// import React from 'react'
// import { Search } from 'lucide-react'

// const SearchBar = () => {
//   return (
//     <div className="relative bg-gray-100 px-4 py-3 rounded-md mt-6">
//       <Search className="w-4 h-4 text-indigo-600 absolute left-4 top-1/2 -translate-y-1/2" />
//       <input 
//         className="text-sm text-gray-600 outline-none bg-transparent pl-8 w-full"
//         placeholder="Search..." 
//       />
//     </div>
//   )
// }

// export default SearchBar
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative bg-gray-100 px-4 py-3 rounded-md mt-6">
      <Search className="w-4 h-4 text-indigo-600 absolute left-4 top-1/2 -translate-y-1/2" />
      <input 
        className="text-sm text-gray-600 outline-none bg-transparent pl-8 w-full"
        placeholder="Search..." 
      />
    </div>
  );
}