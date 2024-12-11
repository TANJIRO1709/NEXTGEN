"use client";

import React from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "../../user/DashboardLayout";
import Link from "next/link";

const VisualRepresentation: React.FC = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="p-6 flex flex-col items-center justify-center h-full"
      >
        <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Title */}
          <motion.h1
            className="text-lg sm:text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 text-center p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Visual Representation
          </motion.h1>

          {/* Responsive Iframe */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-[75vh]" // Set height relative to viewport
          >
            <iframe
              src="https://app.powerbi.com/view?r=eyJrIjoiYTk4ZTVhODUtZjVhNS00MDk1LWJiOWMtYzRmMGVmM2UyZjVkIiwidCI6ImJhZDEyODY0LTkxM2UtNGI5OS04N2Q2LWI4ZDJhZDQ1OWUyNyIsImMiOjEwfQ%3D%3D"
              title="Visual Representation"
              className="absolute inset-0 w-full h-full border-none rounded-lg"
              allowFullScreen
            />
          </motion.div>
        </div>

        {/* External Link */}
        <Link
          href="https://app.powerbi.com/view?r=eyJrIjoiYTk4ZTVhODUtZjVhNS00MDk1LWJiOWMtYzRmMGVmM2UyZjVkIiwidCI6ImJhZDEyODY0LTkxM2UtNGI5OS04N2Q2LWI4ZDJhZDQ1OWUyNyIsImMiOjEwfQ%3D%3D"
          passHref
        >
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 inline-block text-blue-600 hover:text-blue-700 font-semibold text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Fullscreen
          </motion.a>
        </Link>
      </motion.div>
    </DashboardLayout>
  );
};

export default VisualRepresentation;