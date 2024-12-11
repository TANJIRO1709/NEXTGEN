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
  FaMapMarkerAlt,
} from "react-icons/fa";

import { locationsData } from "../../data/location";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

interface PostOffice {
  Name: string;
  BranchType: string;
}

const AdminSignupForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [adminData, setAdminData] = useState({
    fullName: "",
    state: "",
    district: "",
    pinCode: "",
    postOffice: "",
    department: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    state: "",
    district: "",
    pinCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [isLoadingPinCode, setIsLoadingPinCode] = useState(false);

  const validateField = (name: string, value: string): string => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) {
          error = "Full name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Full name can only contain letters and spaces";
        }
        break;
      case "employeeId":
        if (!value) {
          error = "Employee ID is required";
        } else if (!/^[A-Za-z0-9-]+$/.test(value)) {
          error = "Employee ID can only contain letters, numbers, and hyphens";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = "Password must contain uppercase, lowercase and number";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== adminData.password) {
          error = "Passwords do not match";
        }
        break;
      case "department":
        if (!value) {
          error = "Please select a department";
        }
        break;
      case "state":
        if (!value) {
          error = "Please select a state";
        }
        break;
      case "district":
        if (!value) {
          error = "Please select a district";
        }
        break;
      case "pinCode":
        if (!value) {
          error = "PIN code is required";
        } else if (!/^\d{6}$/.test(value)) {
          error = "Invalid PIN code";
        }
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });

    // Validate the field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Special validation for confirm password when password changes
    if (name === "password") {
      const confirmError = adminData.confirmPassword
        ? validateField("confirmPassword", adminData.confirmPassword)
        : "";
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    setAdminData({
      ...adminData,
      state: value,
      district: "",
      postOffice: "",
    });

    // Validate state
    const error = validateField("state", value);
    setErrors((prev) => ({
      ...prev,
      state: error,
      district: "", // Clear district error when state changes
    }));
  };

  const handleDistrictChange = (e) => {
    const { value } = e.target;
    setAdminData({
      ...adminData,
      district: value,
      postOffice: "",
    });

    // Validate district
    const error = validateField("district", value);
    setErrors((prev) => ({
      ...prev,
      district: error,
    }));
  };

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinCode = e.target.value;
    setAdminData((prev) => ({ ...prev, pinCode }));

    if (pinCode.length === 6) {
      setIsLoadingPinCode(true);
      fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            const mainOffices = data[0].PostOffice.filter(
              (office: PostOffice) => office.BranchType === "Sub Post Office"
            );
            setPostOffices(mainOffices);
          } else {
            setPostOffices([]);
            throw new Error(data[0].Message || "Invalid PIN code");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch post offices:", error);
          setPostOffices([]);
          setErrors((prev) => ({
            ...prev,
            pinCode: "Failed to fetch post offices. Please try again.",
          }));
        })
        .finally(() => {
          setIsLoadingPinCode(false);
        });
    }
  };

  const getDistricts = () => {
    const selectedState = locationsData.find(
      (location) => location.state === adminData.state
    );
    return selectedState ? selectedState.districts : [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      fullName: validateField("fullName", adminData.fullName),
      employeeId: validateField("employeeId", adminData.employeeId),
      email: validateField("email", adminData.email),
      password: validateField("password", adminData.password),
      confirmPassword: validateField("confirmPassword", adminData.confirmPassword),
      department: validateField("department", adminData.department),
      state: validateField("state", adminData.state),
      district: validateField("district", adminData.district),
      pinCode: validateField("pinCode", adminData.pinCode),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    // Validate post office selection
    if (!adminData.postOffice) {
      toast.error("Please select a post office");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Creating admin account...");

    try {
      const response = await fetch(`http://localhost:4000/api/v1/auth/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          fullName: adminData.fullName,
          employeeId: adminData.employeeId,
          email: adminData.email,
          password: adminData.password,
          department: adminData.department,
          state: adminData.state,
          district: adminData.district,
          pinCode: adminData.pinCode,
          postOffice: adminData.postOffice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Admin account created successfully!");

        // Store user data and userType in localStorage
        const userData = {
          ...data.admin,
          userType: 'admin'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userType', 'admin');

        // Login admin with token and user data including userType
        login(data.token, userData);

        // Clear form data
        setAdminData({
          fullName: "",
          state: "",
          district: "",
          pinCode: "",
          postOffice: "",
          department: "",
          employeeId: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Small delay to ensure localStorage is set before redirect
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 100);
      } else {
        // Show specific error message from server
        toast.dismiss(loadingToast);
        toast.error(data.message || "Failed to create admin account");
      }
    } catch (error) {
      // Handle network or other errors
      toast.dismiss(loadingToast);
      console.error("Admin signup error:", error);
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error("Unable to connect to server. Please check your internet connection.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name and Employee ID */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="fullName"
              type="text"
              value={adminData.fullName}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaIdBadge className="absolute top-3 left-3 text-gray-400" />
            <input
              name="employeeId"
              type="text"
              value={adminData.employeeId}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.employeeId ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Employee ID"
            />
            {errors.employeeId && (
              <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>
            )}
          </div>
        </div>
      </div>

      {/* Email and Department */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              value={adminData.email}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
            <select
              name="department"
              value={adminData.department}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.department ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
            >
              <option value="">Select Department</option>
              <option value="department1">Department 1</option>
              <option value="department2">Department 2</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
          </div>
        </div>
      </div>

      {/* Password Fields */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={adminData.password}
              onChange={handleChange}
              className={`pl-12 pr-12 text-gray-800 bg-white/90 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={adminData.confirmPassword}
              onChange={handleChange}
              className={`pl-12 pr-12 text-gray-800 bg-white/90 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location Fields */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-gray-400" />
            <select
              name="state"
              value={adminData.state}
              onChange={handleStateChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
            >
              <option value="">Select State</option>
              {locationsData.map((location) => (
                <option key={location.state} value={location.state}>
                  {location.state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaMapMarkedAlt className="absolute top-3 left-3 text-gray-400" />
            <select
              name="district"
              value={adminData.district}
              onChange={handleDistrictChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.district ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
            >
              <option value="">Select District</option>
              {getDistricts().map((district) => (
                <option key={district.district} value={district.district}>
                  {district.district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-xs mt-1">{errors.district}</p>
            )}
          </div>
        </div>
      </div>

      {/* PIN Code */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="pinCode"
              value={adminData.pinCode}
              onChange={handlePinCodeChange}
              maxLength={6}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                errors.pinCode ? "border-red-500" : "border-gray-300"
              } w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Enter PIN code"
            />
            {isLoadingPinCode && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              </div>
            )}
            {errors.pinCode && (
              <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>
            )}
          </div>
        </div>

        {/* Post Office */}
        <div className="w-1/2">
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-gray-400" />
            <select
              name="postOffice"
              value={adminData.postOffice}
              onChange={handleChange}
              disabled={!postOffices.length}
              className={`pl-12 text-gray-800 bg-white/90 border ${
                !postOffices.length ? "bg-gray-100" : ""
              } border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
            >
              <option value="">Select Post Office</option>
              {postOffices.map((office) => (
                <option key={office.Name} value={office.Name}>
                  {office.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-semibold"
      >
        Create Admin Account
      </button>

      <p className="text-gray-800 text-sm mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 font-semibold hover:underline">
          Login here
        </a>
      </p>
    </form>
  );
};

export default AdminSignupForm;