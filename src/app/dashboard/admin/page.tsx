'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './dashboard/StatCard';
import UserStatCard from './dashboard/UserStatCard';
import EventsSection from './dashboard/EventsSection';
import FavoriteSchemes from './dashboard/FavoriteSchemes';
import UserDetails from './dashboard/UserDetails';
import { DashboardLayout } from '../user/DashboardLayout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mx-4 space-y-8"
      >
        <motion.h1 
          variants={fadeInUp}
          className="text-2xl font-bold"
        >
          India Post Financial Services Dashboard
        </motion.h1>
        
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <UserStatCard />
          <StatCard
            title="Total Events Conducted"
            value="18"
            change={{ value: 5, period: 'last month' }}
          />
          <StatCard
            title="Average Users Income"
            value="₹75,000"
            change={{ value: 6, period: 'last year' }}
          />
          <StatCard
            title="No. of Unemployed People"
            value="10,000"
            change={{ value: -6, period: 'last month' }}
          />
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <EventsSection />
          <FavoriteSchemes />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <UserDetails />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
