'use client';

import { useState } from 'react';
import { MessageSquare, GitCompare, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '../DashboardLayout';
import { ComparisonView } from './components/ComparisionView';
import { schemeDetails } from '@/data/schemeDetails';
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    }
  }
};

export default function RecommendedSchemes() {
  const [question, setQuestion] = useState('');
  const [schemes, setSchemes] = useState<string[]>([]);
  const [selectedScheme1, setSelectedScheme1] = useState('');
  const [selectedScheme2, setSelectedScheme2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [disable, setDisable] = useState(false);

  const handleAskQuestion = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!question) {
      setResponse("");
      return;
    }

    setIsLoading(true);
    setResponse("");
    setDisable(true);
    setSchemes([]);

    try {
      const link = process.env.NEXT_PUBLIC_BASE_API_URL + "/api/ServiceHubAI";
      console.log(link);
      const result = await axios.post(
        link,
        {
          prompt: question,
        }
      );

      setResponse(result.data.response);
      
      // Extract scheme names from the response and set them
      const schemeNames = result.data.response
        .split('\n')
        .filter((line: string) => line.includes('Scheme') || line.includes('Yojana'))
        .map((line: string) => line.trim());
      
      setSchemes(schemeNames);
    } catch (e: any) {
      console.error(e);
      setDisable(false);
      setResponse("Sorry, there was an error processing your request. Please try again.");
    } finally {
      setIsLoading(false);
      setDisable(false);
    }
  };

  const handleCompare = () => {
    if (!selectedScheme1 || !selectedScheme2) {
      alert('Please select two schemes to compare');
      return;
    }
    setShowComparison(true);
  };

  const getScheme2Options = () => {
    return Object.keys(schemeDetails).filter(scheme => scheme !== selectedScheme1);
  };

  const handleScheme1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedScheme1(newValue);
    if (newValue === selectedScheme2) {
      setSelectedScheme2('');
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8 max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Scheme Recommendations</h1>
          <p className="text-gray-600">Get personalized scheme recommendations based on your needs</p>
        </motion.div>

        {/* AI Assistant Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
                <p className="text-gray-600">Ask your questions and get instant answers</p>
              </div>
            </div>
            
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-gray-400 h-5 w-5" />
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] bg-gray-50"
                  placeholder="Type your question here..."
                  disabled={isLoading || disable}
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || disable}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Get Recommendations</span>
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {response && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 bg-[#D4E2D4] bg-opacity-60 rounded-xl p-6"
                >
                  <div className="prose prose-blue max-w-none">
                    {response.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              {schemes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span>Recommended Schemes</span>
                  </h3>
                  <div className="space-y-3">
                    {schemes.map((scheme, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 group-hover:text-blue-700 transition-colors">{scheme}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Compare Schemes Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <GitCompare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Compare Schemes</h2>
                <p className="text-gray-600">Compare different schemes side by side</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Scheme</label>
                <select
                  value={selectedScheme1}
                  onChange={handleScheme1Change}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-100"
                >
                  <option value="">Select Scheme 1</option>
                  {Object.keys(schemeDetails).map((scheme, index) => (
                    <option key={index} value={scheme}>{schemeDetails[scheme].name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Second Scheme</label>
                <select
                  value={selectedScheme2}
                  onChange={(e) => setSelectedScheme2(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-gray-100"
                  disabled={!selectedScheme1}
                >
                  <option value="">Select Scheme 2</option>
                  {getScheme2Options().map((scheme, index) => (
                    <option key={index} value={scheme}>{schemeDetails[scheme].name}</option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCompare}
              disabled={!selectedScheme1 || !selectedScheme2}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              <GitCompare className="h-5 w-5" />
              <span>Compare Schemes</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Comparison View */}
        <AnimatePresence>
          {showComparison && selectedScheme1 && selectedScheme2 && (
            <ComparisonView
              scheme1={selectedScheme1}
              scheme2={selectedScheme2}
              onClose={() => setShowComparison(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}
