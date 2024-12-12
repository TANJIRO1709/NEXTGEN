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

interface FarmingFormData {
  state: string;
  district: string;
  crop: string;
  season: string;
  waterLevel: string;
  temperature: string;
  rainfall: string;
  humidity: string;
}

interface TargetAudienceFormData {
  state: string;
  district: string;
  scheme: string;
  month: string;
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Scheme[]>([]);
  const [schemeLoading, setSchemeLoading] = useState(false);
  const [farmingLoading, setFarmingLoading] = useState(false);
  const [targetLoading, setTargetLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [farmingResponse, setFarmingResponse] = useState<string>('');
  const [targetResponse, setTargetResponse] = useState<string>('');
  const [schemeDisable, setSchemeDisable] = useState(false);
  const [farmingDisable, setFarmingDisable] = useState(false);
  const [targetDisable, setTargetDisable] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    state: '',
    district: ''
  });
  const [farmingFormData, setFarmingFormData] = useState<FarmingFormData>({
    state: '',
    district: '',
    crop: '',
    season: '',
    waterLevel: '',
    temperature: '',
    rainfall: '',
    humidity: ''
  });
  const [targetFormData, setTargetFormData] = useState<TargetAudienceFormData>({
    state: '',
    district: '',
    scheme: '',
    month: ''
  });

  const districts = formData.state ? districtData.find(s => s.state === formData.state)?.districts || [] : [];
  const farmingDistricts = farmingFormData.state ? districtData.find(s => s.state === farmingFormData.state)?.districts || [] : [];
  const targetDistricts = targetFormData.state ? districtData.find(s => s.state === targetFormData.state)?.districts || [] : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { district: '' } : {})
    }));
  };

  const handleFarmingInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmingFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { district: '' } : {})
    }));
  };

  const handleTargetInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTargetFormData(prev => ({
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

    setSchemeLoading(true);
    setSchemeDisable(true);
    setAiResponse('');

    const question = `What are the schemes suitable for the district of ${formData.district}?`;
    console.log(question);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_ADMIN_API_URL}/api/ServiceHubAI`,
        { prompt: question },
        { 
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 120000 // Increased to 2 minutes
        }
      );

      if (response.data && response.data.response) {
        setAiResponse(response.data.response);
      } else {
        setAiResponse('Received an invalid response format. Please try again.');
      }
    } catch (error: any) {
      console.error('Error fetching recommendations:', error);
      if (error.code === 'ECONNABORTED') {
        setAiResponse('The request took too long to respond. Please try again.');
      } else if (error.response) {
        setAiResponse(`Error: ${error.response.data?.message || 'Something went wrong. Please try again.'}`);
      } else if (error.request) {
        setAiResponse('Unable to reach the server. Please check your connection and try again.');
      } else {
        setAiResponse('An unexpected error occurred. Please try again.');
      }
    } finally {
      setSchemeLoading(false);
      setSchemeDisable(false);
    }
  };

  const handleFarmingRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!farmingFormData.state || !farmingFormData.district || !farmingFormData.crop || 
        !farmingFormData.season || !farmingFormData.waterLevel || !farmingFormData.temperature || 
        !farmingFormData.rainfall || !farmingFormData.humidity) {
      alert('Please fill in all fields');
      return;
    }

    setFarmingLoading(true);
    setFarmingDisable(true);
    setFarmingResponse('');

    const question = `What is the likelihood of crop ${farmingFormData.crop} plantation success in the district of ${farmingFormData.district} during the ${farmingFormData.season} season if the water level is ${farmingFormData.waterLevel} mm temperature is ${farmingFormData.temperature} C rainfall is ${farmingFormData.rainfall} mm and humidity is ${farmingFormData.humidity}?`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    console.log(question);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_CROP_API_URL}/api/ServiceHubAI`,
        { prompt: question },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);
      setFarmingResponse(response.data.response);
    } catch (error: any) {
      if (error.name !== 'CanceledError') {
        console.error('Error fetching recommendations:', error);
        setFarmingResponse('Sorry, there was an error processing your request. Please try again.');
      }
    } finally {
      setFarmingLoading(false);
      setFarmingDisable(false);
      controller.abort();
    }
  };

  const handleTargetRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!targetFormData.state || !targetFormData.district || !targetFormData.scheme || !targetFormData.month) {
      alert('Please fill in all fields');
      return;
    }

    setTargetLoading(true);
    setTargetDisable(true);
    setTargetResponse('');

    const schemeName = targetFormData.scheme.match(/\((.*?)\)/)?.[1] || targetFormData.scheme;
    const question = `What is the importance of the ${schemeName} scheme in ${targetFormData.district} during ${targetFormData.month}?`;
    console.log(question);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_TARGET_API_URL}/api/ServiceHubAI`,
        { prompt: question },
        { 
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 120000
        }
      );

      if (response.data && response.data.response) {
        setTargetResponse(response.data.response);
      } else {
        setTargetResponse('Received an invalid response format. Please try again.');
      }
    } catch (error: any) {
      console.error('Error fetching recommendations:', error);
      if (error.code === 'ECONNABORTED') {
        setTargetResponse('The request took too long to respond. Please try again.');
      } else if (error.response) {
        setTargetResponse(`Error: ${error.response.data?.message || 'Something went wrong. Please try again.'}`);
      } else if (error.request) {
        setTargetResponse('Unable to reach the server. Please check your connection and try again.');
      } else {
        setTargetResponse('An unexpected error occurred. Please try again.');
      }
    } finally {
      setTargetLoading(false);
      setTargetDisable(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Existing Scheme Recommendations Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            AI District wise Scheme recommendation 
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
                disabled={schemeDisable}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {schemeLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Get Scheme Recommendations
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Scheme Response Section */}
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mt-6"
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

        {/* New Farming Cycle Recommendations Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            AI Farming Cycle Recommendations
          </h2>
          
          <form onSubmit={handleFarmingRecommendations} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={farmingFormData.state}
                  onChange={handleFarmingInputChange}
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
                  value={farmingFormData.district}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select District</option>
                  {farmingDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop
                </label>
                <select
                  name="crop"
                  value={farmingFormData.crop}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Crop</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Millet">Millet</option>
                  <option value="Rice">Rice</option>
                  <option value="Groundnut">Groundnut</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <select
                  name="season"
                  value={farmingFormData.season}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Season</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Rainy/Monsoon">Rainy/Monsoon</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Water Level (mm)
                </label>
                <input
                  type="number"
                  name="waterLevel"
                  value={farmingFormData.waterLevel}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={farmingFormData.temperature}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="-50"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  value={farmingFormData.rainfall}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  value={farmingFormData.humidity}
                  onChange={handleFarmingInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={farmingDisable}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {farmingLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Get Farming Recommendations
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Farming Response Section */}
          {farmingResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mt-6"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Farming Recommendations
                </h3>
              </div>
              <div className="p-6">
                {farmingResponse.split('\n').map((line, index) => {
                  if (line.trim()) {
                    const isHeading = line.includes('Success') || line.includes('Recommendation');
                    const isSubheading = line.includes('Factors') || line.includes('Suggestions');
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
                        <p key={index} className="text-gray-600 mb-2 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-600">
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

        {/* Target Audience Recommendations Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            Target Audience Recommendations
          </h2>
          
          <form onSubmit={handleTargetRecommendations} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={targetFormData.state}
                  onChange={handleTargetInputChange}
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
                  value={targetFormData.district}
                  onChange={handleTargetInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select District</option>
                  {targetDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheme
                </label>
                <select
                  name="scheme"
                  value={targetFormData.scheme}
                  onChange={handleTargetInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Scheme</option>
                  <option value="Public Provident Fund (PPF)">Public Provident Fund (PPF)</option>
                  <option value="Sukanya Samriddhi Account (SSA)">Sukanya Samriddhi Account (SSA)</option>
                  <option value="Senior Citizen Savings Scheme (SCSS)">Senior Citizen Savings Scheme (SCSS)</option>
                  <option value="Monthly Income Scheme (MIS)">Monthly Income Scheme (MIS)</option>
                  <option value="Recurring Deposit (RD)">Recurring Deposit (RD)</option>
                  <option value="National Savings Certificate (NSC)">National Savings Certificate (NSC)</option>
                  <option value="Pradhan Mantri Fasal Bima Yojana (PMFBY)">Pradhan Mantri Fasal Bima Yojana (PMFBY)</option>
                  <option value="Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)">Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)</option>
                  <option value="Mahila Samman Savings Certificate">Mahila Samman Savings Certificate</option>
                  <option value="Soil Health Card (SHC)">Soil Health Card (SHC)</option>
                  <option value="Kisan Credit Card (KCC)">Kisan Credit Card (KCC)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <select
                  name="month"
                  value={targetFormData.month}
                  onChange={handleTargetInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={targetDisable}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {targetLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Get Target Audience Insights
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Target Audience Response Section */}
          {targetResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mt-6"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Target Audience Insights
                </h3>
              </div>
              <div className="p-6">
                {targetResponse.split('\n').map((line, index) => {
                  if (line.trim()) {
                    const isHeading = line.includes('Importance') || line.includes('Benefits') || line.includes('Overview');
                    const isSubheading = line.includes('Target') || line.includes('Features') || line.includes('Eligibility');
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
                        <p key={index} className="text-gray-600 mb-2 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-purple-600">
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
      </div>
    </DashboardLayout>
  );
};

export default AIRecommendations;
