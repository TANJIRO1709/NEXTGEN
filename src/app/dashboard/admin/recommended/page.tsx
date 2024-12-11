"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '../../user/DashboardLayout';
import { motion } from 'framer-motion';

interface Scheme {
  name: string;
  description: string;
}

interface FormData {
  state: string;
  district: string;
  pincode: string;
  gender: string;
  age: string;
  income: string;
  occupation: string;
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    state: '',
    district: '',
    pincode: '',
    gender: '',
    age: '',
    income: '',
    occupation: ''
  });

  const schemes: Scheme[] = [
    {
      name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
      description: "Financial inclusion program offering banking services to all Indian citizens"
    },
    {
      name: "Atal Pension Yojana (APY)",
      description: "Pension scheme for workers in unorganized sector"
    },
    {
      name: "National Savings Certificate (NSC)",
      description: "Government-backed investment scheme with guaranteed returns"
    },
    {
      name: "Sukanya Samriddhi Yojana (SSY)",
      description: "Savings scheme for girl child education and marriage expenses"
    }
  ];

  const handleGetRecommendations = () => {
    setLoading(true);
    // Simulating API call delay
    setTimeout(() => {
      setRecommendations(schemes);
      setLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-2">AI-Powered Scheme Recommendations</h1>
          <p className="text-gray-600 text-center mb-8">Get personalized scheme recommendations based on your parameters</p>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                >
                  <option value="">Select state</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">District</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                >
                  <option value="">Select district</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="nagpur">Nagpur</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pincode</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <input 
                  type="number"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Income</label>
                <input 
                  type="number"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter annual income"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Occupation</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                >
                  <option value="">Select occupation</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGetRecommendations}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                'Get Recommendations'
              )}
            </button>
          </div>

          {recommendations.length > 0 && (
            <div className="space-y-4">
              {recommendations.map((scheme, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{scheme.name}</h3>
                  <p className="text-gray-600">{scheme.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AIRecommendations;
