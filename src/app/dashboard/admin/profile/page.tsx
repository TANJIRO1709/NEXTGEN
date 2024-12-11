'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Building2, Briefcase, Award, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EditProfileDialog from './EditProfileDialog';
import { DashboardLayout } from '../../user/DashboardLayout';
import { motion } from 'framer-motion';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  postOffice: string;
  department: string;
  employeeId: string;
  joinDate: string;
  stats: {
    totalSchemes: number;
    activeCampaigns: number;
    successRate: number;
    completedProjects: number;
  };
}

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

export default function ProfilePage() {
  const router = useRouter();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Doe',
    title: 'Senior Postal Officer',
    email: 'john.doe@gov.in',
    phone: '+91 98765 43210',
    state: 'Odisha',
    district: 'Khurda',
    postOffice: 'Airport Khorda',
    department: 'Agriculture',
    employeeId: 'EMP001',
    joinDate: 'January 2020',
    stats: {
      totalSchemes: 24,
      activeCampaigns: 3,
      successRate: 92,
      completedProjects: 45
    }
  });

  const handleSave = (newData: any) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      name: newData.fullName,
      email: newData.email,
      state: newData.state,
      district: newData.district,
      postOffice: newData.postOffice,
      department: newData.department,
      employeeId: newData.employeeId,
    }));
    setShowEditDialog(false);
  };

  const dialogInitialData = {
    fullName: profile.name,
    email: profile.email,
    state: profile.state,
    district: profile.district,
    postOffice: profile.postOffice,
    department: profile.department,
    employeeId: profile.employeeId,
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        {/* Header */}
        <motion.div 
          variants={fadeInUp}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => setShowEditDialog(true)}
            className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 bg-white transition-colors"
          >
            Edit Profile
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-xl p-8 shadow-sm"
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{profile.name}</h2>
              <p className="text-gray-600 mb-4">{profile.title}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Personal Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium text-gray-900">{profile.employeeId}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{profile.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Work Information */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Work Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium text-gray-900">{profile.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{profile.state}</p>
                  <p className="text-sm text-gray-500">{profile.district} - {profile.postOffice}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Total Schemes</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">{profile.stats.totalSchemes}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Active Campaigns</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">{profile.stats.activeCampaigns}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Success Rate</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">{profile.stats.successRate}%</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Completed</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">{profile.stats.completedProjects}</p>
          </div>
        </motion.div>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          onSave={handleSave}
          initialData={dialogInitialData}
        />
      </motion.div>
    </DashboardLayout>
  );
}