"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '../user/DashboardLayout';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import DepartmentProtectedRoute from '@/app/components/auth/DepartmentProtectedRoute';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const schemes = [
  'Post Office Savings Account (SB)',
  'National Savings RD Account',
  'National Savings TD Account',
  'Monthly Income Account (MIS)',
  'Senior Citizens Savings (SCSS)',
  'Public Provident Fund (PPF)',
  'Sukanya Samriddhi Account',
  'National Savings Certificates',
  'Kisan Vikas Patra (KVP)',
  'Mahila Samman Savings',
  'PM CARES for Children'
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SubDivisionalAdmin = () => {
  const [selectedScheme, setSelectedScheme] = useState(schemes[0]);

  // Active Users vs Months Data
  const activeUsersData = {
    labels: months,
    datasets: [{
      label: 'Active Users',
      data: [1200, 1350, 1500, 1800, 2100, 2400, 2800, 3000, 2800, 2600, 2400, 2200],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgb(53, 162, 235)',
      borderWidth: 1,
    }],
  };

  // Revenue vs Schemes Data
  const revenueData = {
    labels: schemes,
    datasets: [{
      label: 'Revenue Generated (in Lakhs)',
      data: [45, 62, 58, 75, 85, 92, 68, 72, 55, 48, 35],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
    }],
  };

  // Regional Performance Data
  const regionalData = {
    labels: ['High Performance', 'Moderate Performance', 'Low Performance'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ],
      borderColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 206, 86)',
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DepartmentProtectedRoute allowedDepartments={['SL']}>
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sub Divisional Level Analytics</h1>
            <div className="flex gap-4 items-center">
              <p className="text-gray-600">Select Scheme:</p>
              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {schemes.map((scheme) => (
                  <option key={scheme} value={scheme}>
                    {scheme}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Active Users Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Active Users Over Time</h2>
              <div className="h-[400px]">
                <Bar data={activeUsersData} options={barOptions} />
              </div>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Revenue by Scheme</h2>
              <div className="h-[400px]">
                <Bar data={revenueData} options={barOptions} />
              </div>
            </motion.div>
          </div>

          {/* Regional Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Regional Performance Distribution</h2>
            <div className="h-[400px] max-w-2xl mx-auto">
              <Pie data={regionalData} options={chartOptions} />
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </DepartmentProtectedRoute>
  );
};

export default SubDivisionalAdmin;