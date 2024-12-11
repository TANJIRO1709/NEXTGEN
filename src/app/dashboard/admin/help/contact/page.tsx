'use client';

import { ArrowLeft, Phone, Clock, Users, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          href="/help" 
          className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Help Center
        </Link>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={item}>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-8">
              {/* Toll Free Number Section */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-1">Toll Free Number</h2>
                  <p className="text-xl font-semibold text-blue-600 mb-2">1800 266 6868</p>
                  <div className="space-y-1 text-gray-600">
                    <p>Call centre agent: 09:00 AM to 06:00 PM</p>
                    <p>(except Sunday and gazetted holidays)</p>
                    <p>IVR facility: 24 x 7</p>
                  </div>
                </div>
              </div>

              {/* Independent External Monitors Section */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-3">Independent External Monitors</h2>
                  <p className="text-gray-600 mb-4">For the purpose of Tender related grievances only</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-medium text-gray-900">Shri Raj Kumar Singh, IRS (Retd.)</p>
                      <p className="text-gray-600">Ex-Member, Customs Excise and Service Tax Appellate Tribunal, New Delhi</p>
                      <p className="text-gray-600">26 Cassia Marg, DLF-2, Gurgaon - 122008</p>
                      <p className="text-gray-600">0124 - 4241100</p>
                      <a href="mailto:mrrajksingh@gmail.com" className="text-blue-500 hover:text-blue-600 transition-colors">
                        mrrajksingh@gmail.com
                      </a>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-medium text-gray-900">Shri Animesh Chauhan</p>
                      <p className="text-gray-600">Former MD & CEO of oriental Bank of Commerce</p>
                      <p className="text-gray-600">Flat no 948, G Block, 6th Avenue, Gaur City 1, Sector 4</p>
                      <p className="text-gray-600">Greater Noida (West), Uttar Pradesh - 201009</p>
                      <a href="mailto:animeshchau@gmail.com" className="text-blue-500 hover:text-blue-600 transition-colors">
                        animeshchau@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Web Information Manager Section */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 mb-3">Web Information Manager</h2>
                  <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-gray-900">Dr. P.M. Saravanan</p>
                    <p className="text-gray-600">General Manager</p>
                    <p className="text-gray-600">Centre For Excellence in Postal Technology</p>
                    <p className="text-gray-600">Bengaluru, Karnataka, 560001</p>
                    <a href="mailto:webinformationmanager@indiapost.gov.in" className="text-blue-500 hover:text-blue-600 transition-colors">
                      webinformationmanager@indiapost.gov.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
