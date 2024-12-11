"use client";
import React, { useState, useEffect } from 'react';
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
  FaTimes,
  FaSave,
} from 'react-icons/fa';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
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
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
  showFarmerFields: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profileData,
  handleChange,
  handleSave,
  showFarmerFields,
}) => {
  const [postOffices, setPostOffices] = useState<Array<{ Name: string; BranchType: string }>>([]);

  const handlePinCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinCode = e.target.value;
    handleChange(e);
    if (pinCode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = await response.json();
        if (data[0].Status === "Success") {
          const mainOffices = data[0].PostOffice.filter((office: any) => office.BranchType === "Sub Post Office");
          setPostOffices(mainOffices);
        } else {
          setPostOffices([]);
          throw new Error(data[0].Message || "Invalid PIN code");
        }
      } catch (error) {
        console.error("Failed to fetch post offices:", error);
        alert(`Failed to fetch post offices: ${error}`);
        setPostOffices([]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="fullName"
                    type="text"
                    value={profileData.fullName}
                    onChange={handleChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Date of Birth</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="dob"
                    type="date"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Gender</label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                  className="w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Occupation</label>
                <div className="relative">
                  <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
                  <select
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Occupation</option>
                    <option value="student">Student</option>
                    <option value="govtEmployee">Govt Employee</option>
                    <option value="dailyWageWorker">Daily Wage Worker</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="farmer">Farmer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Pin Code</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="pinCode"
                    type="text"
                    value={profileData.pinCode}
                    onChange={handlePinCodeChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={6}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Post Office</label>
                <select
                  name="postOffice"
                  value={profileData.postOffice}
                  onChange={handleChange}
                  className="w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Post Office</option>
                  {postOffices.map((office) => (
                    <option key={office.Name} value={office.Name}>
                      {office.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-gray-800 text-sm mb-2 block">Address</label>
                <div className="relative">
                  <FaHome className="absolute top-3 left-3 text-gray-400" />
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Income Category */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Income Category</label>
              <select
                name="incomeCategory"
                value={profileData.incomeCategory}
                onChange={handleChange}
                className="w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Income Category</option>
                <option value="<1lakh">&lt;1 Lakh</option>
                <option value="1-5lakhs">1-5 Lakhs</option>
                <option value=">5lakhs">&gt;5 Lakhs</option>
              </select>
            </div>
          </div>

          {/* Farmer Specific Fields */}
          {showFarmerFields && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Farming Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Acres of Land</label>
                  <div className="relative">
                    <FaTractor className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="acresOfLand"
                      type="number"
                      value={profileData.acresOfLand}
                      onChange={handleChange}
                      className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Crops Grown</label>
                  <div className="relative">
                    <FaSeedling className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="cropsGrown"
                      type="text"
                      value={profileData.cropsGrown}
                      onChange={handleChange}
                      className="pl-10 w-full border bg-gray-50 border-gray-300 rounded-md text-sm py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2"
          >
            <FaSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
