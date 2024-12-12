"use client";

import React from 'react';
import { DashboardLayout } from '../user/DashboardLayout';
import { motion } from 'framer-motion';
import DepartmentProtectedRoute from '@/app/components/auth/DepartmentProtectedRoute';

interface ZoneData {
  name: string;
  totalEvents: number;
  mostLikedSchemes: {
    name: string;
    percentage: string;
  }[];
  eventAttendees: number;
  accountGrowth: string;
}

interface SchemeCard {
  name: string;
  description: string;
  tags: string[];
  icon?: string;
}

const zoneData: ZoneData[] = [
  {
    name: "Eastern Zone",
    totalEvents: 45,
    mostLikedSchemes: [
      { name: "Senior Citizen Savings Scheme", percentage: "35%" },
      { name: "Public Provident Fund", percentage: "28%" },
      { name: "National Savings Certificate", percentage: "20%" }
    ],
    eventAttendees: 1200,
    accountGrowth: "2.5%"
  },
  {
    name: "Northern Zone",
    totalEvents: 38,
    mostLikedSchemes: [
      { name: "Public Provident Fund", percentage: "40%" },
      { name: "Sukanya Samriddhi Yojana", percentage: "30%" },
      { name: "National Savings Certificate", percentage: "15%" }
    ],
    eventAttendees: 980,
    accountGrowth: "1.8%"
  },
  {
    name: "Southern Zone",
    totalEvents: 52,
    mostLikedSchemes: [
      { name: "Sukanya Samriddhi Yojana", percentage: "38%" },
      { name: "Senior Citizen Savings Scheme", percentage: "32%" },
      { name: "Public Provident Fund", percentage: "18%" }
    ],
    eventAttendees: 1500,
    accountGrowth: "3.2%"
  },
  {
    name: "Western Zone",
    totalEvents: 41,
    mostLikedSchemes: [
      { name: "National Savings Certificate", percentage: "36%" },
      { name: "Public Provident Fund", percentage: "25%" },
      { name: "Senior Citizen Savings Scheme", percentage: "22%" }
    ],
    eventAttendees: 1100,
    accountGrowth: "2.1%"
  }
];

const popularSchemes: SchemeCard[] = [
  {
    name: "Senior Citizen Savings Scheme (SCSS)",
    description: "Exclusively for individuals aged 60 and above, offering attractive interest rates and tax benefits.",
    tags: ["60+ Age", "Tax Benefits", "High Interest"]
  },
  {
    name: "Public Provident Fund (PPF)",
    description: "Long-term savings scheme with tax benefits and guaranteed returns.",
    tags: ["Tax Saving", "Long Term", "Guaranteed Returns"]
  },
  {
    name: "Sukanya Samriddhi Yojana (SSY)",
    description: "Government scheme for girl child education and marriage expenses with high interest rates.",
    tags: ["Girl Child", "Education", "High Returns"]
  },
  {
    name: "National Savings Certificate (NSC)",
    description: "Fixed income investment scheme with guaranteed returns and tax benefits.",
    tags: ["Fixed Income", "Tax Benefits", "Safe Investment"]
  }
];

const RegionalLevelAdmin = () => {
  return (
    <DepartmentProtectedRoute allowedDepartments={['RL']}>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Regional Post Office Level</h1>
          
          {/* Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {zoneData.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-600">{zone.name}</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Events:</span>
                    <span className="font-medium">{zone.totalEvents}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-600">Most Liked Schemes:</span>
                    <div className="space-y-1">
                      {zone.mostLikedSchemes.map((scheme, idx) => (
                        <div key={idx} className="flex justify-between items-center pl-4">
                          <span className="text-sm">{scheme.name}</span>
                          <span className="text-sm font-medium text-blue-600">{scheme.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Event Attendees:</span>
                    <span className="font-medium">{zone.eventAttendees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Growth:</span>
                    <span className="font-medium text-green-600">{zone.accountGrowth}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Popular Schemes Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Details About the Most Liked Schemes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {popularSchemes.map((scheme, index) => (
                <motion.div
                  key={scheme.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">{scheme.name}</h3>
                      <p className="text-gray-600 mb-4">{scheme.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </DepartmentProtectedRoute>
  );
};

export default RegionalLevelAdmin;