"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
  FaTimes,
  FaSave,
} from 'react-icons/fa';
import { locationsData } from '@/data/location';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: {
    fullName: string;
    email: string;
    state: string;
    district: string;
    postOffice: string;
    department: string;
    employeeId: string;
  };
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [profileData, setProfileData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when dialog opens with initial data
  useEffect(() => {
    if (isOpen) {
      setProfileData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const getDistricts = () => {
    const selectedState = locationsData.find(
      (location) => location.state === profileData.state
    );
    return selectedState ? selectedState.districts : [];
  };

  const getPostOffices = () => {
    const districts = getDistricts();
    const selectedDistrict = districts.find(
      (district) => district.district === profileData.district
    );
    return selectedDistrict ? selectedDistrict.postOffices : [];
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileData(prev => ({
      ...prev,
      state: e.target.value,
      district: '',
      postOffice: ''
    }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileData(prev => ({
      ...prev,
      district: e.target.value,
      postOffice: ''
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    Promise.resolve()
      .then(() => {
        onSave(profileData);
        onClose();
      })
      .catch((error) => {
        console.error('Error saving profile:', error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl mx-4 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FaTimes className="text-white" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Full Name and Employee ID */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="fullName"
                      type="text"
                      value={profileData.fullName}
                      onChange={handleChange}
                      className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="employeeId"
                      type="text"
                      value={profileData.employeeId}
                      onChange={handleChange}
                      className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Employee ID"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Department */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <div className="relative">
                    <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
                    <select
                      name="department"
                      value={profileData.department}
                      onChange={handleChange}
                      className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Department</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* State and District */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                    <select
                      name="state"
                      value={profileData.state}
                      onChange={handleStateChange}
                      className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select State</option>
                      {locationsData.map((location) => (
                        <option key={location.state} value={location.state}>
                          {location.state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                    <select
                      name="district"
                      value={profileData.district}
                      onChange={handleDistrictChange}
                      className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select District</option>
                      {getDistricts().map((district) => (
                        <option key={district.district} value={district.district}>
                          {district.district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Post Office */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Office</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                  <select
                    name="postOffice"
                    value={profileData.postOffice}
                    onChange={handleChange}
                    className="pl-10 w-full bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Post Office</option>
                    {getPostOffices().map((postOffice) => (
                      <option key={postOffice} value={postOffice}>
                        {postOffice}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-6 py-4">
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileDialog;