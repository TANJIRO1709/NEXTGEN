"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaPhone,
  FaEyeSlash,
  FaCalendarAlt,
  FaHome,
  FaMapMarkerAlt,
  FaBriefcase,
  FaRupeeSign,
  FaLeaf,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from '../context/AuthContext';

const UserSignupForm = () => {
  const { login, setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    address: "",
    pinCode: "",
    postOffice: "",
    occupation: "",
    incomeCategory: "",
    acresOfLand: "",
    cropsGrown: "",
    termsAccepted: false,
  });
  const [postOffices, setPostOffices] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    pinCode: "",
  });
  const [isLoadingPinCode, setIsLoadingPinCode] = useState(false);
  const router = useRouter();

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) {
          error = "Full name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Full name can only contain letters and spaces";
        }
        break;
      case "phoneNumber":
        if (!value) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
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
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      case "pinCode":
        if (!value) {
          error = "PIN code is required";
        } else if (!/^\d{6}$/.test(value)) {
          error = "PIN code must be 6 digits";
        }
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validate the field
    if (type !== "checkbox") {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    // Special validation for confirm password when password changes
    if (name === "password") {
      const confirmError = formData.confirmPassword
        ? validateField("confirmPassword", formData.confirmPassword)
        : "";
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handlePinCodeChange = (e) => {
    const pinCode = e.target.value;
    setFormData({ ...formData, pinCode });

    if (pinCode.length === 6) {
      setIsLoadingPinCode(true);
      fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            const mainOffices = data[0].PostOffice.filter(
              (office) => office.BranchType === "Sub Post Office"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    let hasErrors = false;
    Object.keys(formData).forEach((field) => {
      if (validateField(field as keyof typeof formData, formData[field as keyof typeof formData])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      toast.error("Passwords do not match");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: "POST",
        credentials: 'include', // Important for sending/receiving cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          dob: formData.dob,
          address: formData.address,
          pinCode: formData.pinCode,
          postOffice: formData.postOffice,
          occupation: formData.occupation,
          incomeCategory: formData.incomeCategory,
          acresOfLand: formData.acresOfLand,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Account created successfully!");

        // Login user with token
        login(data.token, data.user);

        // Redirect to dashboard
        router.push("/dashboard/user");
      } else {
        // Show error message
        toast.dismiss(loadingToast);
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      // Show error message
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${errors.fullName ? "border-red-500" : "border-gray-300"} w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Full Name"
              required
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Phone Number"
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${errors.email ? "border-red-500" : "border-gray-300"} w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              name="dob"
              type="date"
              value={formData.dob}
              max={new Date().toISOString().split("T")[0]}
              min="1940-01-01"
              onChange={handleChange}
              placeholder="Date of Birth"
              className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
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

      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`pl-12 pr-12 text-gray-800 bg-white/90 border ${errors.password ? "border-red-500" : "border-gray-300"} w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
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
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-12 pr-12 text-gray-800 bg-white/90 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
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

      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              name="pinCode"
              type="text"
              value={formData.pinCode}
              onChange={handlePinCodeChange}
              className={`pl-12 text-gray-800 bg-white/90 border ${errors.pinCode ? "border-red-500" : "border-gray-300"} w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200`}
              placeholder="Pin Code"
              required
            />
            {errors.pinCode && (
              <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
            <select
              name="postOffice"
              value={formData.postOffice}
              onChange={handleChange}
              className="w-full  text-gray-800 bg-white/90 border border-gray-300 text-sm pl-8 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
            >
              <option value="">Select Post Office</option>
              {postOffices.map((office, index) => (
                <option key={index} value={office.Name}>
                  {office.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <FaHome className="absolute top-3 left-3 text-gray-400" />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200 min-h-[100px] resize-y"
            placeholder="Address"
          ></textarea>
        </div>
      </div>

      <div>
        <div className="relative">
          <FaRupeeSign className="absolute top-3 left-3 text-gray-400" />
          <select
            name="incomeCategory"
            value={formData.incomeCategory}
            onChange={handleChange}
            className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
          >
            <option value="">Select Income Category</option>
            <option value="<1lakh">&lt;1 Lakh</option>
            <option value="1-5lakhs">1-5 Lakhs</option>
            <option value=">5lakhs">&gt;5 Lakhs</option>
          </select>
        </div>
      </div>

      {formData.occupation === "farmer" && (
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="relative">
              <FaLeaf className="absolute top-3 left-3 text-gray-400" />
              <input
                name="acresOfLand"
                type="number"
                value={formData.acresOfLand}
                onChange={handleChange}
                className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
                placeholder="Acres of Land"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="relative">
              <FaLeaf className="absolute top-3 left-3 text-gray-400" />
              <input
                name="cropsGrown"
                type="text"
                value={formData.cropsGrown}
                onChange={handleChange}
                className="pl-12 text-gray-800 bg-white/90 border border-gray-300 w-full text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:bg-white transition-colors duration-200"
                placeholder="Crops Grown"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center">
        <input
          id="termsAccepted"
          name="termsAccepted"
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-800">
          I accept the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms and Conditions
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-semibold"
      >
        Create Account
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
};

export default UserSignupForm;
