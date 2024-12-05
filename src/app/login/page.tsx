"use client";
import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt, FaIdBadge } from "react-icons/fa";
import auth from "@/auth"; // Ensure this module exists or remove this line if not needed
import { redirect } from "next/navigation";
import { createSessionClient } from "@/appwrite/config";
const LoginPage = async () => {
  const [activeTab, setActiveTab] = useState("user"); // "user" or "admin"
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    employeeId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === "user") {
      console.log("User Login Data:", {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
      });
    } else {
      console.log("Admin Login Data:", {
        employeeId: formData.employeeId,
        password: formData.password,
      });
    }
  };
 const user = await auth.getUser();
    if (user) redirect("/");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="max-w-6xl w-full p-4 m-4 shadow-md rounded-md grid md:grid-cols-2 gap-4 bg-white">
        {/* Form Section */}
        <div className="md:max-w-md w-full px-4 py-6">
          <form onSubmit={handleSubmit} action={auth.createSession}>
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">
                Login
              </h3>
              <p className="text-sm mt-4 text-gray-800">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </div>

            {/* Button Group */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                className={`px-6 py-2 text-sm rounded-s-md font-semibold transition-all duration-300 ease-in-out ${
                  activeTab === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab("user")}
              >
                Login as User
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-e-md text-sm font-semibold transition-all duration-300 ease-in-out ${
                  activeTab === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab("admin")}
              >
                Login as Admin
              </button>
            </div>

            {/* Dynamic Form Fields */}
            {activeTab === "user" ? (
              <>
                {/* Email or Phone */}
                <div className="mb-6">
                  <label className="block text-gray-800 text-xs mb-2 text-[14px]">
                    Email or Phone
                  </label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-2 text-gray-400" />
                    <input
                      name="emailOrPhone"
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      className="pl-8 w-full border-b bg-transparent rounded-md border-gray-300 focus:border-blue-600 text-gray-800 text-sm py-3 outline-none"
                      placeholder="Enter email or phone number"
                      defaultValue={"sujalnitrkl0596@gmail.com"}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Employee ID */}
                <div className="mb-6">
                  <label className="block text-gray-800 text-xs mb-2 text-[14px]">
                    Employee ID
                  </label>
                  <div className="relative flex items-center">
                    <FaIdBadge className="absolute left-2 text-gray-400" />
                    <input
                      name="employeeId"
                      type="text"
                      required
                      value={formData.employeeId}
                      onChange={handleChange}
                      className="pl-8 w-full border-b rounded-md bg-transparent border-gray-300 focus:border-blue-600 text-gray-800 text-sm py-3 outline-none"
                      placeholder="Enter employee ID"
                      defaultValue={"674f62f2003ab302e35c"}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-800 text-xs mb-2 text-[14px]">
                Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-8 bg-transparent w-full rounded-md border-b border-gray-300 focus:border-blue-600 text-gray-800 text-sm py-3 outline-none"
                  placeholder="Enter password"
                  defaultValue={"sujal911"}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-sm text-gray-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-transparent text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block bg-red rounded-xl p-8">
          <img
            src="https://cdn.posttrack.com/cdn/images/carriers/icons/0035-india-post.png"
            className="w-full h-full object-contain rounded-xl"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
