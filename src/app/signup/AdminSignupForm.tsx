"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaMapMarkedAlt,
  FaBriefcase,
  FaIdBadge,
} from "react-icons/fa";

import { locationsData } from "../../data/location";



const AdminSignupForm = () => {
    const [adminData, setAdminData] = useState({
        fullName: "",
        state: "",
        district: "",
        postOffice: "",
        department: "",
        employeeId: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
      };
      const handleStateChange = (e) => {

        setAdminData({
          ...adminData,
          state: e.target.value,
          district: "", 
          postOffice: "", 
        });
      };
    
      const handleDistrictChange = (e) => {
        setAdminData({
          ...adminData,
          district: e.target.value,
          postOffice: "", 
        });
      };
    
      const getDistricts = () => {
        const selectedState = locationsData.find(
          (location) => location.state === adminData.state
        );
        return selectedState ? selectedState.districts : [];
      };
           
      const getPostOffices = () => {
        const districts = getDistricts();
        const selectedDistrict = districts.find(
          (district) => district.district === adminData.district
        );
        return selectedDistrict ? selectedDistrict.postOffices : [];
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Signup Data:", adminData);
        setAdminData({fullName: "",
            state: "",
            district: "",
            postOffice: "",
            department: "",
            employeeId: "",
            email: "",
            password: "",
            confirmPassword: "",});
      };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                name="fullName"
                type="text"
                value={adminData.fullName}
                onChange={handleChange}
                className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full Name"
                />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-gray-800 text-sm mb-2 block">State</label>
              <div className="relative">
                <FaBuilding className="absolute top-3 left-3 text-gray-400" />
                <select
                  name="state"
                  value={adminData.state}
                  onChange={handleStateChange}
                  className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
              <label className="text-gray-800 text-sm mb-2 block">District</label>
              <div className="relative">
                <FaMapMarkedAlt className="absolute top-3 left-3 text-gray-400" />
                <select
                  name="district"
                  value={adminData.district}
                  onChange={handleDistrictChange}
                  className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
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

          {/* Post Office and Department */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-gray-800 text-sm mb-2 block">Post Office</label>
              <div className="relative">
                <FaBuilding className="absolute top-3 left-3 text-gray-400" />
                <select
                  name="postOffice"
                  value={adminData.postOffice}
                  onChange={handleChange}
                  className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <option value="">Select Post Office</option>
                  {getPostOffices().map((postOffice, index) => (
                  <option key={index} value={postOffice}>
                    {postOffice}
                  </option>
                ))}
                </select>
              </div>
            </div>
            <div className="w-1/2">
              <label className="text-gray-800 text-sm mb-2 block">Department</label>
              <div className="relative">
                <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
                <select
                  name="department"
                  value={adminData.department}
                  onChange={handleChange}
                  className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <option value="">Select Department</option>
                  <option value="department1">Department 1</option>
                  <option value="department2">Department 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employee ID */}
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Employee ID</label>
            <div className="relative">
              <FaIdBadge className="absolute top-3 left-3 text-gray-400" />
              <input
                name="employeeId"
                type="text"
                value={adminData.employeeId}
                onChange={handleChange}
                className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Employee ID"
                />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                name="email"
                type="email"
                value={adminData.email}
                onChange={handleChange}
                className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email Address"
                />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={adminData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  />
                {showPassword ? (
                  <FaEyeSlash
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="w-1/2">
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={adminData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm Password"
                  />
                {showConfirmPassword ? (
                  <FaEyeSlash
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEye
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
          </div>
          <button
        type="submit"
        className="w-full py-3 px-4 mt-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        Signup as Admin
      </button>
          </form>
  )
}

export default AdminSignupForm