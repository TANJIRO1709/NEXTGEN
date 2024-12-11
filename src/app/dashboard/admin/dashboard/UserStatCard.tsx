'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Users } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface UserCategory {
  label: string;
  value: string;
  change: {
    value: number;
    period: string;
  };
}

const userCategories: UserCategory[] = [
  {
    label: 'Total Users',
    value: '2.2 lakhs',
    change: {
      value: 2.1,
      period: 'last month'
    }
  },
  {
    label: 'Male Users',
    value: '1.3 lakhs',
    change: {
      value: 1.8,
      period: 'last month'
    }
  },
  {
    label: 'Female Users',
    value: '90,000',
    change: {
      value: 2.4,
      period: 'last month'
    }
  },
  {
    label: 'Children',
    value: '45,000',
    change: {
      value: 1.5,
      period: 'last month'
    }
  },
  {
    label: 'Senior Citizens',
    value: '35,000',
    change: {
      value: 3.2,
      period: 'last month'
    }
  }
];

export default function UserStatCard() {
  const [selectedCategory, setSelectedCategory] = useState(userCategories[0]);
  const isPositive = selectedCategory.change.value > 0;

  return (
    <div className="group relative overflow-hidden">
      {/* Background gradient that shifts on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 bg-white border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {/* Subtle border gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none group-hover:text-gray-800 transition-colors duration-300">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100/80 transition-colors duration-300">
                    <Users className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                  </div>
                  {selectedCategory.label}
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 group-hover:translate-y-[1px]" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="bg-white rounded-lg shadow-lg border min-w-[200px] z-[9999] overflow-hidden"
                  sideOffset={4}
                  align="start"
                >
                  {userCategories.map((category) => (
                    <DropdownMenu.Item
                      key={category.label}
                      className="text-sm px-4 py-2.5 cursor-pointer hover:bg-gray-50 focus:outline-none flex items-center gap-2 text-gray-700 hover:text-gray-900"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.label}
                      {category === selectedCategory && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      )}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {selectedCategory.value}
              </span>
              <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <div className="flex items-center">
                  {isPositive ? (
                    <ArrowUp 
                      size={16} 
                      className="transition-transform group-hover:translate-y-[-2px]" 
                    />
                  ) : (
                    <ArrowDown 
                      size={16} 
                      className="transition-transform group-hover:translate-y-[2px]" 
                    />
                  )}
                  <span>{Math.abs(selectedCategory.change.value)}%</span>
                </div>
              </div>
            </div>
            
            <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
              vs {selectedCategory.change.period}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-[-4rem] group-hover:translate-x-20 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full translate-y-12 -translate-x-8 group-hover:translate-y-16 group-hover:-translate-x-12 transition-transform duration-500" />
      </div>
    </div>
  );
}
