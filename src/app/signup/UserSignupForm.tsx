"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";


const UserSignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    address: "",
    pinCode: "",
    occupation: "",
    incomeCategory: "",
    acresOfLand: "",
    cropsGrown: "",
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Signup Data:", formData);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: "",
      address: "",
      pinCode: "",
      occupation: "",
      incomeCategory: "",
      acresOfLand: "",
      cropsGrown: "",
      termsAccepted: false,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    {/* Full Name and Email */}
    <div className="flex gap-4">
      <div className="w-1/2">
        <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Full Name"
          />
        </div>
      </div>
      <div className="w-1/2">
        <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email Address"
          />
        </div>
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
            value={formData.password}
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
            value={formData.confirmPassword}
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

    {/* Gender and Date of Birth */}
    <div className="flex gap-4">
      <div className="w-1/2">
        <label className="text-gray-800 text-sm mb-2 block">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="w-1/2">
        <label className="text-gray-800 text-sm mb-2 block">Date of Birth</label>
        <div className="relative">
          <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    {/* Occupation and Pin Code */}
    <div className="flex gap-4">
      <div className="w-1/2">
        <label className="text-gray-800 text-sm mb-2 block">Occupation</label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Occupation</option>
          <option value="student">Student</option>
          <option value="govtEmployee">Govt Employee</option>
          <option value="dailyWageWorker">Daily Wage Worker</option>
          <option value="unemployed">Unemployed</option>
          <option value="farmer">Farmer</option>
        </select>
      </div>
      <div className="w-1/2">
        <label className="text-gray-800 text-sm mb-2 block">Pin Code</label>
        <div className="relative">
          <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
          <input
            name="pinCode"
            type="text"
            value={formData.pinCode}
            onChange={handleChange}
            className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Pin Code"
          />
        </div>
      </div>
    </div>

    {/* Address */}
    <div>
      <label className="text-gray-800 text-sm mb-2 block">Address</label>
      <div className="relative">
        <FaHome className="absolute top-3 left-3 text-gray-400" />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="pl-10 text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Address"
        ></textarea>
      </div>
    </div>

   

    {/* Income Category */}
    <div>
      <label className="text-gray-800 text-sm mb-2 block">Income Category</label>
      <select
        name="incomeCategory"
        value={formData.incomeCategory}
        onChange={handleChange}
        className="text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Income Category</option>
        <option value="<1lakh">&lt;1 Lakh</option>
        <option value="1-5lakhs">1-5 Lakhs</option>
        <option value=">5lakhs">&gt;5 Lakhs</option>
      </select>
    </div>

    {/* Dynamic Fields for Farmer */}
    {formData.occupation === "farmer" && (
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-gray-800 text-sm mb-2 block">Acres of Land</label>
          <input
            name="acresOfLand"
            type="number"
            value={formData.acresOfLand}
            onChange={handleChange}
            className="text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Acres of Land"
          />
        </div>
        <div className="w-1/2">
          <label className="text-gray-800 text-sm mb-2 block">Crops Grown</label>
          <input
            name="cropsGrown"
            type="text"
            value={formData.cropsGrown}
            onChange={handleChange}
            className="text-gray-800 bg-gray-50 border border-gray-300 w-full text-sm px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Crops Grown"
          />
        </div>
      </div>
    )}

    {/* Terms and Conditions */}
    <div className="flex items-center mt-4">
      <input
        id="termsAccepted"
        name="termsAccepted"
        type="checkbox"
        checked={formData.termsAccepted}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="termsAccepted" className="text-gray-800 ml-3 text-sm">
        I accept the{" "}
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          Terms and Conditions
        </a>
      </label>
    </div>

    

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 px-4 mt-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
    >
      Create an Account
    </button>

    <p className="text-gray-800 text-sm mt-4 text-center">
          Already have an account?{" "}
          <a
          href="/login" // Replace with your login page URL
          className="text-blue-600 font-semibold hover:underline"
          >
          Login here
          </a>
      </p>
  </form>
  );
}

export default UserSignupForm