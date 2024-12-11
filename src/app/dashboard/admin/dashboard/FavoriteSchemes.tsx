'use client';

import { useState } from 'react';
import { 
  Search, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SchemeTag {
  label: string;
}

interface PopularScheme {
  id: string;
  name: string;
  description: string;
  tags: SchemeTag[];
  likes: number;
}

const popularSchemes: PopularScheme[] = [
  {
    id: 'ssa',
    name: 'Sukanya Samriddhi Account (SSA)',
    description: 'A savings scheme for the girl child, offering high interest rates and tax benefits, with funds accessible after maturity or for educational purposes.',
    tags: [
      { label: 'Girl Child' },
      { label: 'Education' },
      { label: 'Tax Benefits' }
    ],
    likes: 92
  },
  {
    id: 'pmcares',
    name: 'PM CARES for Children Scheme, 2021',
    description: 'Provides financial assistance, scholarships, and healthcare for children orphaned due to COVID-19.',
    tags: [
      { label: 'COVID-19' },
      { label: 'Healthcare' },
      { label: 'Education' }
    ],
    likes: 67
  },
  {
    id: 'sb',
    name: 'Post Office Savings Account (SB)',
    description: 'A basic savings account offered by the post office with attractive interest rates and low minimum balance requirements.',
    tags: [
      { label: 'Basic Account' },
      { label: 'Low Balance' },
      { label: 'Interest' }
    ],
    likes: 50
  }
];

export default function FavoriteSchemes() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchemes = popularSchemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.tags.some(tag => tag.label.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSchemeClick = (schemeId: string) => {
    router.push('/schemes');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header Section */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User's Favorite Schemes</h2>
            <p className="text-gray-600 mt-1">Your most liked schemes</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search your favorite schemes..."
            className="w-full pl-12 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Schemes List */}
      <div className="p-6 space-y-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{scheme.name}</h3>
                <p className="text-gray-600">{scheme.description}</p>
              </div>
              <div className="flex flex-col items-center ml-4 group-hover:scale-110 transition-transform">
                <Heart 
                  className="text-red-500 fill-red-500 w-8 h-8 hover:scale-110 transition-transform cursor-pointer" 
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
                />
                <span className="text-sm font-medium text-gray-600 mt-1">{scheme.likes}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {scheme.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <button 
                onClick={() => handleSchemeClick(scheme.id)}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
              >
                View Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
