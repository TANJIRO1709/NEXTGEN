"use client";
import React, { useState } from "react";
import UserSignupForm from "./UserSignupForm";
import AdminSignupForm from "./AdminSignupForm";
import TabNavigation from "./TabNavigation";
import { motion } from "framer-motion";

const RegistrationForm = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob top-0 -right-48"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000 bottom-0 -left-48"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full mx-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 h-full">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
                <p className="text-gray-600">Join us and explore our services</p>
              </div>
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
              {activeTab === "user" ? <UserSignupForm /> : <AdminSignupForm />}
            </div>
          </div>
          
          {/* Right Side - Image/Illustration */}
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h2 className="text-3xl font-bold mb-4">Welcome to NextGen</h2>
                  <p className="text-lg opacity-90">Join our community and discover a world of possibilities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
