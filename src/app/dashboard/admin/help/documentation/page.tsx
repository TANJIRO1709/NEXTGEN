'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Briefcase, 
  BarChart, 
  ChevronRight,
  Search
} from 'lucide-react';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Sections data
  const sections = [
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'scheme-management',
      title: 'Scheme Management',
      icon: Briefcase,
      color: 'green'
    },
    {
      id: 'analytics',
      title: 'Analytics and Reporting',
      icon: BarChart,
      color: 'purple'
    }
  ];

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link 
                href="/help" 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Help Center
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg
                      transition-colors ${
                        activeSection === section.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    <section.icon className="w-4 h-4 mr-2" />
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <motion.div 
          variants={item}
          className="max-w-2xl"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 mb-12">
            Welcome to our comprehensive documentation. Find detailed guides and resources for all features.
          </p>
        </motion.div>

        {/* Documentation Sections */}
        <div className="space-y-16">
          {/* User Management */}
          <motion.section 
            variants={item}
            id="user-management"
            className="scroll-mt-24"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
                  <p className="text-gray-600">Learn how to manage users and their permissions</p>
                </div>
              </div>
              
              <div className="prose prose-blue max-w-none">
                <h3>Adding New Users</h3>
                <p>To add a new user to the system:</p>
                <ol className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-medium">1</span>
                    <span>Navigate to the Users section from the sidebar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-medium">2</span>
                    <span>Click the "Add User" button in the top right</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-medium">3</span>
                    <span>Fill in the required information (name, occupation, income, etc.)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-medium">4</span>
                    <span>Click "Save" to create the user</span>
                  </li>
                </ol>

                <h3>Managing Existing Users</h3>
                <p>You can perform the following actions on existing users:</p>
                <ul className="space-y-2">
                  {[
                    "View detailed information by clicking on a user's name",
                    'Edit user details using the edit button',
                    'Delete users (requires confirmation)',
                    'Filter and search users using the search bar'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Scheme Management */}
          <motion.section 
            variants={item}
            id="scheme-management"
            className="scroll-mt-24"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Scheme Management</h2>
                  <p className="text-gray-600">Learn how to create and manage financial schemes</p>
                </div>
              </div>

              <div className="prose prose-green max-w-none">
                <h3>Creating New Schemes</h3>
                <p>To create a new financial scheme:</p>
                <ol className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm font-medium">1</span>
                    <span>Go to the Schemes section</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm font-medium">2</span>
                    <span>Click "Create New Scheme"</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm font-medium">3</span>
                    <span>Fill in scheme details including name, description, and eligibility criteria</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm font-medium">4</span>
                    <span>Set up scheme parameters and benefits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm font-medium">5</span>
                    <span>Review and publish the scheme</span>
                  </li>
                </ol>

                <h3>Monitoring Schemes</h3>
                <p>Track scheme performance through:</p>
                <ul className="space-y-2">
                  {[
                    'Real-time enrollment statistics',
                    'Beneficiary demographics',
                    'Financial disbursement tracking',
                    'Impact assessment metrics'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Analytics and Reporting */}
          <motion.section 
            variants={item}
            id="analytics"
            className="scroll-mt-24"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics and Reporting</h2>
                  <p className="text-gray-600">Learn how to generate and analyze reports</p>
                </div>
              </div>

              <div className="prose prose-purple max-w-none">
                <h3>Generating Reports</h3>
                <p>Access various reports from the Analytics dashboard:</p>
                <ul className="space-y-2">
                  {[
                    'User demographics and distribution',
                    'Scheme performance metrics',
                    'Financial summaries',
                    'Impact assessment reports'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3>Data Export</h3>
                <p>Export data in multiple formats:</p>
                <ul className="space-y-2">
                  {[
                    'CSV for spreadsheet analysis',
                    'PDF for formal reporting',
                    'JSON for system integration'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
