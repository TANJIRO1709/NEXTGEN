"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-16 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-[500px] h-[500px] bg-blue-400 rounded-full filter blur-3xl animate-blob -top-48 -right-48"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000 -bottom-48 -left-48"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-white">NEXTGEN</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering businesses with next-generation financial solutions and SEO tools for sustainable growth and success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Financial Analysis</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Market Research</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Business Strategy</a></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Newsletter</h4>
            <p className="text-gray-300 text-sm">Subscribe to our newsletter for updates and insights.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
              <button className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} NEXTGEN. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
