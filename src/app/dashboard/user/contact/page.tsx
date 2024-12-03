"use client";
import React from 'react'

import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { DashboardLayout } from '../DashboardLayout';


const page = () => {
  return (
  <DashboardLayout>

  
      <div className="max-w-screen-lg mx-auto  bg-white my-6 font-sans p-6">
      <div className="text-center">
        <h2 className="text-gray-800 text-3xl font-extrabold">Contact Us</h2>
        <p className="text-sm text-gray-500 mt-4">
          Have some big idea or brand to develop and need help?
        </p>
      </div>

      <div className="grid lg:grid-cols-3 items-start gap-8 p-4 mt-12 shadow-lg rounded-lg">
        {/* Contact Information */}
        <motion.div
          className="bg-[#011c2b] rounded-lg p-6 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p className="text-sm text-gray-300 mt-4">
            Have some big idea or brand to develop and need help?
          </p>

          <ul className="mt-8 space-y-6">
            <li className="flex items-center">
              <FaEnvelope className="text-white text-lg" />
              <a href="mailto:info@example.com" className="ml-4 text-sm">
                info@example.com
              </a>
            </li>
            <li className="flex items-center">
              <FaPhone className="text-white text-lg" />
              <a href="tel:+158996888" className="ml-4 text-sm">
                +158 996 888
              </a>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-white text-lg" />
              <p className="ml-4 text-sm">123 Street, 256 House</p>
            </li>
          </ul>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="lg:col-span-2 bg-gray-50 rounded-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            Send a Message
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500"
                required
                />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500"
                required
                />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500 h-32 resize-none"
              required
              ></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
              </DashboardLayout>
  );


}

export default page