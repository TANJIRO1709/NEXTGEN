"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '../../user/DashboardLayout';
import { motion } from 'framer-motion';
import { districtData } from '@/data/districts';
import { MessageSquare, Search, Sparkles } from 'lucide-react';
import axios from 'axios';

interface Scheme {
  name: string;
  description: string;
}

interface FormData {
  state: string;
  district: string;
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    state: '',
    district: ''
  });

  const districts = formData.state ? districtData.find(s => s.state === formData.state)?.districts || [] : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { district: '' } : {})
    }));
  };

  const handleGetRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.state || !formData.district) {
      alert('Please select both state and district');
      return;
    }

    setLoading(true);
    setDisable(true);
    setAiResponse('');

    const question = `What are the schemes suitable for the district of ${formData.district}?`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_ADMIN_API_URL}/api/ServiceHubAI`,
        { prompt: question },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);
      setAiResponse(response.data.response);
    } catch (error: any) {
      // Don't show error message for canceled requests
      if (error.name !== 'CanceledError') {
        console.error('Error fetching recommendations:', error);
        setAiResponse('Sorry, there was an error processing your request. Please try again.');
      }
    } finally {
      setLoading(false);
      setDisable(false);
      controller.abort(); // Cleanup any pending request
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            AI Scheme recommendation District wise
          </h2>
          
          <form onSubmit={handleGetRecommendations} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select State</option>
                  {districtData.map(s => (
                    <option key={s.state} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disable}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Get Recommendations
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Recommended Schemes
              </h3>
            </div>
            <div className="p-6">
              {aiResponse.split('\n').map((line, index) => {
                if (line.trim()) {
                  const isHeading = line.includes('Scheme') && line.includes(':');
                  const isSubheading = line.includes('Eligibility') || line.includes('Benefits') || line.includes('Features');
                  const cleanLine = line.replace(/\*\*/g, '').trim();

                  if (isHeading) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-4 first:mt-0">
                        {cleanLine}
                      </h3>
                    );
                  } else if (isSubheading) {
                    return (
                      <h4 key={index} className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                        {cleanLine}
                      </h4>
                    );
                  } else {
                    return (
                      <p key={index} className="text-gray-600 mb-2 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
                        {cleanLine}
                      </p>
                    );
                  }
                }
                return null;
              })}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIRecommendations;
