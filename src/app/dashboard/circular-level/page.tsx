"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '../user/DashboardLayout';
import { motion } from 'framer-motion';
import { RiBookOpenLine, RiUserLine, RiBriefcaseLine, RiGroupLine } from 'react-icons/ri';
import DepartmentProtectedRoute from '@/app/components/auth/DepartmentProtectedRoute';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal"
];

interface SchemeRecommendation {
  name: string;
  description: string;
}

interface SchemeCard {
  title: string;
  icon: React.ElementType;
  mostPopular: SchemeRecommendation[];
  ageGroup: string;
  details: string;
}

const CircleLevelManager = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);

  const schemeCards: SchemeCard[] = [
    {
      title: "Educational Schemes",
      icon: RiBookOpenLine,
      mostPopular: [
        { 
          name: "Sukanya Samriddhi Account (SSA)",
          description: "For girl child education"
        },
        {
          name: "Public Provident Fund (PPF)",
          description: "Long-term savings for education"
        },
        {
          name: "PM CARES for Children Scheme",
          description: "Support for children affected by COVID-19"
        }
      ],
      ageGroup: "0-21 years",
      details: "Focused on educational support and future planning"
    },
    {
      title: "Gender-Based Schemes",
      icon: RiUserLine,
      mostPopular: [
        {
          name: "Mahila Samman Savings Certificate",
          description: "Exclusive savings scheme for women"
        },
        {
          name: "Sukanya Samriddhi Account (SSA)",
          description: "For girl child future planning"
        }
      ],
      ageGroup: "All ages",
      details: "Women empowerment focused schemes"
    },
    {
      title: "Occupation-Based Schemes",
      icon: RiBriefcaseLine,
      mostPopular: [
        {
          name: "National Savings Monthly Income Account (MIS)",
          description: "Regular income for self-employed"
        },
        {
          name: "Kisan Vikas Patra (KVP)",
          description: "For farmers and rural workers"
        },
        {
          name: "National Savings Time Deposit (TD)",
          description: "For salaried individuals"
        }
      ],
      ageGroup: "18-60 years",
      details: "Schemes based on profession and income type"
    },
    {
      title: "Age-Specific Schemes",
      icon: RiGroupLine,
      mostPopular: [
        {
          name: "Senior Citizens Savings Scheme (SCSS)",
          description: "Higher interest rates for seniors"
        },
        {
          name: "Post Office Savings Account (SB)",
          description: "Basic savings for all ages"
        },
        {
          name: "National Savings Recurring Deposit (RD)",
          description: "Monthly savings habit builder"
        }
      ],
      ageGroup: "All ages (Special benefits for 60+)",
      details: "Age-appropriate investment options"
    }
  ];

  const handleFetchDetails = () => {
    if (selectedState) {
      setShowDetails(true);
    }
  };

  return (
    <DepartmentProtectedRoute allowedDepartments={['CL']}>
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Circle Level Manager</h1>
            <p className="text-gray-600">Compare Post Office savings schemes across different states based on various parameters</p>
          </div>

          <div className="flex gap-4 mb-8">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <button
              onClick={handleFetchDetails}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fetch Details
            </button>
          </div>

          {showDetails && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">{selectedState}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemeCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <card.icon className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">Most Popular Schemes</p>
                        <div className="space-y-2">
                          {card.mostPopular.map((scheme, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-medium text-blue-600">{scheme.name}</p>
                              <p className="text-sm text-gray-600">{scheme.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Target Age Group</p>
                        <p className="font-medium text-gray-800">{card.ageGroup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Details</p>
                        <p className="font-medium text-gray-800">{card.details}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </DepartmentProtectedRoute>
  );
};

export default CircleLevelManager;