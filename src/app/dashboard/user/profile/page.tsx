"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaHome,
  FaTractor,
  FaSeedling,
} from "react-icons/fa";

import { DashboardLayout } from "../DashboardLayout";

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    gender: "male",
    dob: "1990-01-01",
    pinCode: "123456",
    occupation: "Farmer",
    address: "123, Elm Street, Springfield",
    acresOfLand: "10",
    cropsGrown: "Wheat, Rice",
  });

  const [showFarmerFields, setShowFarmerFields] = useState(
    profileData.occupation === "Farmer"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "occupation" && value === "Farmer") {
      setShowFarmerFields(true);
    } else if (name === "occupation") {
      setShowFarmerFields(false);
    }

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Profile Data:", profileData);
  };

  const boxAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full h-fit items-center justify-center">
        <motion.div
          className="w-full max-w-[800px] bg-white border border-gray-200 rounded-lg p-8 shadow-lg"
          initial="hidden"
          animate="visible"
          variants={boxAnimation}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            User Profile
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
              <label
                htmlFor="fullName"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <FaUser className="text-gray-500" />
                {isEditing ? (
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={profileData.fullName}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  />
                ) : (
                  <p className="w-full px-2 py-2 text-gray-600">{profileData.fullName}</p>
                )}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
              <label
                htmlFor="email"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <FaEnvelope className="text-gray-500" />
                {isEditing ? (
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  />
                ) : (
                  <p className="w-full px-2 py-2 text-gray-600">{profileData.email}</p>
                )}
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
              <label
                htmlFor="gender"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Gender
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <FaUser className="text-gray-500" />
                {isEditing ? (
                  <select
                    id="gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="w-full px-2 py-2 text-gray-600">{profileData.gender}</p>
                )}
              </div>
            </motion.div>

            {/* Date of Birth */}
            <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
              <label
                htmlFor="dob"
                className="block text-gray-800 text-sm font-semibold mb-1"
                >
                Date of Birth
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <FaCalendarAlt className="text-gray-500" />
                {isEditing ? (
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  />
                ) : (
                  <p className="w-full px-2 py-2 text-gray-600">{profileData.dob}</p>
                )}
              </div>
            </motion.div>

            {/* Pin Code */}
            <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
              <label
                htmlFor="pinCode"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Pin Code
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <FaMapMarkerAlt className="text-gray-500" />
                {isEditing ? (
                  <input
                    id="pinCode"
                    name="pinCode"
                    type="text"
                    value={profileData.pinCode}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  />
                ) : (
                  <p className="w-full px-2 py-2 text-gray-600">{profileData.pinCode}</p>
                )}
              </div>
            </motion.div>

            {/* Occupation */}
            <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
              <label
                htmlFor="occupation"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Occupation
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <FaBriefcase className="text-gray-500" />
                {isEditing ? (
                  <select
                  id="occupation"
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleChange}
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Govt Employee">Govt Employee</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="w-full px-2 py-2 text-gray-600">{profileData.occupation}</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label
              htmlFor="address"
              className="block text-gray-800 text-sm font-semibold mb-1"
              >
              Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-2">
              <FaHome className="text-gray-500" />
              {isEditing ? (
                <textarea
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  className="w-full px-2 py-2 bg-transparent focus:outline-none"
                />
              ) : (
                <p className="w-full px-2 py-2 text-gray-600">{profileData.address}</p>
              )}
            </div>
          </div>

          {/* Farmer-specific Fields */}
          {showFarmerFields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Acres of Land */}
              <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
                <label
                  htmlFor="acresOfLand"
                  className="block text-gray-800 text-sm font-semibold mb-1"
                >
                  Acres of Land
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                  <FaTractor className="text-gray-500" />
                  {isEditing ? (
                    <input
                      id="acresOfLand"
                      name="acresOfLand"
                      type="number"
                      value={profileData.acresOfLand}
                      onChange={handleChange}
                      className="w-full px-2 py-2 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <p className="w-full px-2 py-2 text-gray-600">{profileData.acresOfLand}</p>
                  )}
                </div>
              </motion.div>

              {/* Crops Grown */}
              <motion.div initial="hidden" animate="visible" variants={boxAnimation}>
                <label
                  htmlFor="cropsGrown"
                  className="block text-gray-800 text-sm font-semibold mb-1"
                  >
                  Crops Grown
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                  <FaSeedling className="text-gray-500" />
                  {isEditing ? (
                    <input
                      id="cropsGrown"
                      name="cropsGrown"
                      type="text"
                      value={profileData.cropsGrown}
                      onChange={handleChange}
                      className="w-full px-2 py-2 bg-transparent focus:outline-none"
                      />
                    ) : (
                    <p className="w-full px-2 py-2 text-gray-600">{profileData.cropsGrown}</p>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-[#3195FD] rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 flex items-center gap-2"
              >
                <FaSave /> Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-4 focus:ring-red-300 flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-[#3195FD] rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
        </motion.div>
      </div>
  </DashboardLayout>
  );
};

export default page;
