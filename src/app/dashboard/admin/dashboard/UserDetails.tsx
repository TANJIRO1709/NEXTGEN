'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowUpDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { User, users } from '../../../../data/users';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type SortField = 'name' | 'age' | 'income' | null;
type SortDirection = 'asc' | 'desc';

const USERS_PER_PAGE_OPTIONS = [25, 50, 100];
const OCCUPATIONS = Array.from(new Set(users.map(user => user.occupation)));
const GENDERS = ['Male', 'Female'];

export default function UserDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [usersPerPage, setUsersPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    occupation: null as string | null,
    gender: null as string | null
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Apply filters
    if (filters.occupation || filters.gender || searchTerm) {
      result = result.filter(user => {
        const matchesSearch = !searchTerm || 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.occupation.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesOccupation = !filters.occupation || user.occupation === filters.occupation;
        const matchesGender = !filters.gender || user.gender === filters.gender;

        return matchesSearch && matchesOccupation && matchesGender;
      });
    }

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        if (sortField === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        const aValue = a[sortField];
        const bValue = b[sortField];
        return sortDirection === 'asc' ? (aValue - bValue) : (bValue - aValue);
      });
    }

    return result;
  }, [searchTerm, sortField, sortDirection, filters]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + usersPerPage);

  const handleUsersPerPageChange = (newValue: number) => {
    setUsersPerPage(newValue);
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="ml-1" />;
    return sortDirection === 'asc' ? 
      <ChevronUp size={14} className="ml-1" /> : 
      <ChevronDown size={14} className="ml-1" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header Section */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
            <p className="text-gray-600 mt-1">Manage and track all rural users in one place</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users by name or occupation..."
              className="w-full pl-12 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-white/80 transition-colors bg-white shadow-sm">
                <Filter size={18} />
                Filters
                <ChevronDown size={14} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="bg-white rounded-lg shadow-lg border w-[280px] z-[9999] overflow-hidden"
                sideOffset={4}
                align="end"
                side="bottom"
              >
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="sticky top-0 bg-white px-4 py-3 border-b">
                    <h3 className="font-medium text-sm text-gray-600">Filters</h3>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-sm text-gray-600 mb-2">Occupation</h3>
                    <div className="space-y-1">
                      {OCCUPATIONS.map(occupation => (
                        <label key={occupation} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                          <input
                            type="radio"
                            checked={filters.occupation === occupation}
                            onChange={() => setFilters(prev => ({ ...prev, occupation }))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{occupation}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                        <input
                          type="radio"
                          checked={filters.occupation === null}
                          onChange={() => setFilters(prev => ({ ...prev, occupation: null }))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">All Occupations</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t px-4 py-3">
                    <h3 className="font-medium text-sm text-gray-600 mb-2">Gender</h3>
                    <div className="space-y-1">
                      {GENDERS.map(gender => (
                        <label key={gender} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                          <input
                            type="radio"
                            checked={filters.gender === gender}
                            onChange={() => setFilters(prev => ({ ...prev, gender }))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{gender}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                        <input
                          type="radio"
                          checked={filters.gender === null}
                          onChange={() => setFilters(prev => ({ ...prev, gender: null }))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">All Genders</span>
                      </label>
                    </div>
                  </div>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Name {getSortIcon('name')}
                </div>
              </th>
              <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('age')}>
                <div className="flex items-center">
                  Age {getSortIcon('age')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occupation
              </th>
              <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('income')}>
                <div className="flex items-center">
                  Income {getSortIcon('income')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.gender === 'Male' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {user.gender}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.occupation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{user.income}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="px-6 py-4 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={usersPerPage}
                onChange={(e) => handleUsersPerPageChange(Number(e.target.value))}
                className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                {USERS_PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} users
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-1 rounded-lg border enabled:hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 text-sm"
            >
              <ChevronLeft size={16} className="mr-1" /> Previous
            </button>
            <span className="px-3 py-1 rounded-lg bg-gray-50 text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-1 rounded-lg border enabled:hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 text-sm"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
