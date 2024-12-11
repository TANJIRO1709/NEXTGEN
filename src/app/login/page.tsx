"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt, FaIdBadge, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { login: authLogin, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    employeeId: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailOrPhone: "",
    employeeId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set navigation flag when accessing login page
    if (!isLoggedIn) {
      sessionStorage.setItem('isNavigating', 'true');
    }
  }, [isLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (activeTab === "user") {
      if (!formData.emailOrPhone) {
        newErrors.emailOrPhone = "Email or phone number is required";
      } else if (!isValidEmail(formData.emailOrPhone) && !isValidPhone(formData.emailOrPhone)) {
        newErrors.emailOrPhone = "Enter a valid email address or 10-digit phone number";
      }
    } else if (activeTab === "admin") {
      if (!formData.emailOrPhone) {
        newErrors.emailOrPhone = "Employee ID is required";
      }
      // Add specific validation for Employee ID if needed
      // For example, checking format or length
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const endpoint = activeTab === "user" 
        ? "http://localhost:4000/api/v1/auth/login"
        : "http://localhost:4000/api/v1/auth/admin/signin";

      const requestBody = activeTab === "user" 
        ? {
            emailOrPhone: formData.emailOrPhone,
            password: formData.password,
          }
        : {
            employeeId: formData.emailOrPhone, // Using emailOrPhone field for employeeId
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token) {
        throw new Error("Authentication failed: No token received");
      }

      // Get user data based on active tab
      const userData = activeTab === "user" ? data.user : data.admin;
      
      if (!userData) {
        throw new Error("Authentication failed: User data not found");
      }

      // Update auth context with the token and user data
      authLogin(data.token, {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        pincode: userData.pinCode || userData.pincode,
        userType: activeTab,
        ...(activeTab === "admin" && {
          employeeId: userData.employeeId,
          department: userData.department
        })
      });

      // Store auth data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', activeTab);
      localStorage.setItem('userData', JSON.stringify(userData));

      // Show success message
      toast.success("Login successful!");
      
      // Small delay to ensure storage is set
      setTimeout(() => {
        router.push(`/dashboard/${activeTab}`);
      }, 100);

    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login");
      // Clear any partial auth data on error
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  // Update placeholder text based on active tab
  const getInputPlaceholder = () => {
    return activeTab === "user" ? "Email or Phone" : "Employee ID";
  };

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-3xl font-bold text-gray-800">
                  Welcome Back
                </h3>
                <p className="text-gray-600 mt-2">
                  Please sign in to continue to your account
                </p>
              </motion.div>

              {/* Login Type Selector */}
              <div className="bg-gray-100 p-1 rounded-lg mb-8">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                      activeTab === "user"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab("user")}
                  >
                    User Login
                  </button>
                  <button
                    type="button"
                    className={`py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                      activeTab === "admin"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab("admin")}
                  >
                    Admin Login
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === "user" ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email or Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/60 transition-all duration-300 ${
                          errors.emailOrPhone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={getInputPlaceholder()}
                      />
                      {errors.emailOrPhone && (
                        <p className="text-sm text-red-500 mt-1">{errors.emailOrPhone}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Employee ID</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaIdBadge className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/60 transition-all duration-300 ${
                          errors.emailOrPhone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={getInputPlaceholder()}
                      />
                      {errors.emailOrPhone && (
                        <p className="text-sm text-red-500 mt-1">{errors.emailOrPhone}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/60 transition-all duration-300 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md"
            >
              <h2 className="text-4xl font-bold mb-6">
                Welcome to NEXTGEN
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Your trusted partner for financial services and SEO solutions. Log in to access your personalized dashboard and start managing your business growth today.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <FaUser className="w-4 h-4" />
                  </div>
                  <p className="text-blue-100">Personalized financial insights</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <FaLock className="w-4 h-4" />
                  </div>
                  <p className="text-blue-100">Secure and encrypted platform</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <FaPhoneAlt className="w-4 h-4" />
                  </div>
                  <p className="text-blue-100">24/7 customer support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
