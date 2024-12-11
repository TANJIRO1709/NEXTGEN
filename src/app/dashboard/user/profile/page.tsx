"use client";
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaHome,
  FaMapMarkerAlt,
  FaBriefcase,
  FaTractor,
  FaSeedling,
  FaEdit,
  FaChartLine,
  FaClock,
  FaRupeeSign,
  FaGenderless
} from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { FaBell, FaHeart, FaCheckCircle } from "react-icons/fa";
import { DashboardLayout } from "../DashboardLayout";

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  pinCode: string;
  postOffice: string;
  occupation: string;
  incomeCategory: string;
  acresOfLand: string;
  cropsGrown: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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
      stiffness: 100
    }
  }
};

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    phoneNumber: "+91 9876543210",
    email: "john.doe@example.com",
    gender: "male",
    dob: "1990-01-01",
    address: "123 Main Street, Apartment 4B",
    pinCode: "500001",
    postOffice: "Secunderabad",
    occupation: "farmer",
    incomeCategory: "1-5lakhs",
    acresOfLand: "5",
    cropsGrown: "Rice, Wheat",
  });

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
    <motion.div 
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        <motion.div 
          className="p-3 bg-blue-50 rounded-lg"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="h-6 w-6 text-blue-600" />
        </motion.div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ title, time, description }: { title: string; time: string; description: string }) => (
    <motion.div 
      variants={itemVariants}
      className="flex space-x-3 pb-4 border-b border-gray-100 last:border-0"
    >
      <motion.div 
        className="p-2 bg-blue-50 rounded-lg h-fit"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <FaClock className="h-4 w-4 text-blue-600" />
      </motion.div>
      <div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-900">{title}</p>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-[#F8F9FA] lg:-mt-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-between items-center"
            >
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </motion.button>
            </motion.div>

            {/* Statistics Cards */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard
                title="Income Category"
                value={profileData.incomeCategory === "1-5lakhs" ? "₹1-5 Lakhs" : profileData.incomeCategory}
                icon={FaRupeeSign}
              />
              {profileData.occupation === "farmer" && (
                <>
                  <StatCard title="Land Owned" value={`${profileData.acresOfLand} Acres`} icon={FaTractor} />
                  <StatCard title="Crops" value={profileData.cropsGrown} icon={FaSeedling} />
                </>
              )}
            </motion.div>

            {/* Profile Information */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Personal Information */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                <motion.div 
                  variants={containerVariants}
                  className="space-y-4"
                >
                  {/* Personal Info Items */}
                  <InfoItem icon={FaUser} label="Full Name" value={profileData.fullName} />
                  <InfoItem icon={FaPhone} label="Phone Number" value={profileData.phoneNumber} />
                  <InfoItem icon={FaEnvelope} label="Email" value={profileData.email} />
                  <InfoItem icon={FaCalendarAlt} label="Date of Birth" value={formatDate(profileData.dob)} />
                  <InfoItem icon={FaBriefcase} label="Occupation" value={profileData.occupation} />
                </motion.div>
              </motion.div>

              {/* Contact Information */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <motion.div 
                  variants={containerVariants}
                  className="space-y-4"
                >
                  <InfoItem icon={FaMapMarkerAlt} label="Pin Code" value={profileData.pinCode} />
                  <InfoItem icon={FaHome} label="Post Office" value={profileData.postOffice} />
                  <InfoItem icon={FaHome} label="Address" value={profileData.address} />
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <motion.div 
                  variants={containerVariants}
                  className="space-y-4"
                >
                  <ActivityItem
                    title="Profile Updated"
                    time="2 hours ago"
                    description="Updated contact information and farming details"
                  />
                  <ActivityItem
                    title="Document Uploaded"
                    time="1 day ago"
                    description="Added Aadhaar card for verification"
                  />
                  <ActivityItem
                    title="Scheme Applied"
                    time="3 days ago"
                    description="Applied for PM-KISAN scheme"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <StatsBox
                color="blue"
                icon={FaCheckCircle}
                value="24"
                label="Total Schemes"
              />
              <StatsBox
                color="green"
                icon={FaBell}
                value="3"
                label="Active Campaigns"
              />
              <StatsBox
                color="purple"
                icon={FaHeart}
                value="92%"
                label="Success Rate"
              />
              <StatsBox
                color="orange"
                icon={FaCheckCircle}
                value="45"
                label="Completed"
              />
            </motion.div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
              {isModalOpen && (
                <EditProfileModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  profileData={profileData}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  showFarmerFields={profileData.occupation === "farmer"}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <motion.div 
    variants={itemVariants}
    className="flex items-center space-x-3"
  >
    <motion.div
      whileHover={{ rotate: 10, scale: 1.1 }}
      className="text-gray-400"
    >
      <Icon className="w-5 h-5" />
    </motion.div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium capitalize">{value}</p>
    </div>
  </motion.div>
);

const StatsBox = ({ color, icon: Icon, value, label }: { color: string; icon: any; value: string; label: string }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`bg-${color}-50 p-4 rounded-xl`}
  >
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center w-10 h-10 bg-${color}-600 rounded-lg mb-3`}
    >
      <Icon className="w-5 h-5 text-white" />
    </motion.div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </motion.div>
);

export default ProfilePage;
