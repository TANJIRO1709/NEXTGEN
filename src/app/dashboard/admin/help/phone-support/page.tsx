'use client';

import { Book, MessageCircle, Phone, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSupport from '../components/ChatSupport';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I create a new scheme?",
    answer: "To create a new scheme, navigate to the Schemes section from the sidebar, click on the 'Create New Scheme' button, fill in the required details like scheme name, description, eligibility criteria, and benefits. Review the information and click 'Publish' to make the scheme active."
  },
  {
    question: "How can I track scheme performance?",
    answer: "You can track scheme performance through the Analytics dashboard. It provides real-time metrics including enrollment numbers, beneficiary demographics, disbursement tracking, and impact assessment. You can also generate detailed reports for specific time periods."
  },
  {
    question: "How do I manage user profiles?",
    answer: "User profiles can be managed from the Users section. You can view detailed information, edit user details, update status, and track their scheme enrollments. Use the search and filter options to find specific users quickly."
  },
  {
    question: "How can I export data for reporting?",
    answer: "Data can be exported from the Analytics section. Choose the type of report (Users, Schemes, or Performance), select the date range and specific metrics, then click 'Export'. Data can be downloaded in CSV, PDF, or JSON formats."
  },
  {
    question: "What should I do if I encounter an error?",
    answer: "If you encounter an error, first note down the error message and the steps that led to it. You can check the documentation for common solutions, use the chat support for immediate assistance, or contact phone support for critical issues."
  },
  {
    question: "How do I set up notifications?",
    answer: "Navigate to Settings > Notifications to configure your notification preferences. You can choose to receive alerts for new user registrations, scheme updates, important deadlines, and system notifications via email or dashboard alerts."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function HelpCenter() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          Help Center
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Get the support you need with our comprehensive help resources
        </motion.p>

        {/* Support Options */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-3 mb-16"
        >
          {/* Documentation */}
          <motion.div
            variants={item}
            onHoverStart={() => setHoveredCard(0)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Link href="/help/documentation">
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Book className="w-10 h-10 text-blue-500 mb-4 transform group-hover:scale-110 
                  transition-transform duration-300" />
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Documentation</h2>
                <p className="text-gray-600 mb-4">
                  Read comprehensive guides and documentation about all financial schemes.
                </p>
                <div className="flex items-center text-blue-500 group-hover:text-blue-600">
                  Learn more 
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Chat Support */}
          <motion.div
            variants={item}
            onHoverStart={() => setHoveredCard(1)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl 
                transition-all duration-300 relative overflow-hidden group cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => {/* Trigger chat */}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MessageCircle className="w-10 h-10 text-green-500 mb-4 transform group-hover:scale-110 
                transition-transform duration-300" />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Chat Support</h2>
              <p className="text-gray-600 mb-4">
                Get instant help from our support team through chat.
              </p>
              <div className="flex items-center text-green-500 group-hover:text-green-600">
                Start chat
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Support */}
          <motion.div
            variants={item}
            onHoverStart={() => setHoveredCard(2)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Link href="/help/phone-support">
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Phone className="w-10 h-10 text-purple-500 mb-4 transform group-hover:scale-110 
                  transition-transform duration-300" />
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Phone Support</h2>
                <p className="text-gray-600 mb-4">
                  Call our dedicated support line for immediate assistance.
                </p>
                <div className="flex items-center text-purple-500 group-hover:text-purple-600">
                  View details
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* FAQs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center p-4
                    hover:bg-gray-50 rounded-xl transition-colors duration-200 group"
                  whileHover={{ x: 4 }}
                  animate={{ 
                    backgroundColor: openFAQ === index ? 'rgb(249, 250, 251)' : 'transparent'
                  }}
                >
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 
                    transition-colors duration-200">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ 
                      rotate: openFAQ === index ? 180 : 0,
                      color: openFAQ === index ? '#3B82F6' : '#6B7280'
                    }}
                    transition={{ duration: 0.2 }}
                    className="transform transition-transform duration-200"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                          },
                          opacity: {
                            duration: 0.2,
                            delay: 0.1
                          }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                          },
                          opacity: {
                            duration: 0.2
                          }
                        }
                      }}
                    >
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 pt-0 pl-4"
                      >
                        <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl
                          border-l-4 border-blue-500">
                          <p className="text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Chat Support Component */}
        <ChatSupport />
      </div>
    </motion.div>
  );
}