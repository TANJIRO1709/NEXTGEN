"use client";
import React, { useState } from "react";
import UserSignupForm from "./UserSignupForm";
import AdminSignupForm from "./AdminSignupForm";
import TabNavigation from "./TabNavigation";

const RegistrationForm = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="flex flex-col min-h-fit justify-center items-center font-sans p-6 sm:h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="max-w-lg w-full bg-white mx-auto border border-gray-200 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
          <p className="text-gray-600">Join us and explore our services</p>
        </div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "user" ? <UserSignupForm /> : <AdminSignupForm />}
      </div>
    </div>
  );
};

export default RegistrationForm;
