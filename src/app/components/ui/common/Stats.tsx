"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserFriends, FaShoppingCart, FaStar, FaChartLine } from "react-icons/fa";


const Stats = () => {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (isInView) => {
      if (isInView) setStartCount(true);
    },
  });

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob animation-delay-4000 -right-48"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob bottom-0 -left-48"></div>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className={` text-2xl md:text-4xl mb-2 font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>Our Growth</span>
          <h2 className="text-xl text-gray-600 max-w-2xl mx-auto">
            Milestones & Achievements
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaUserFriends className="text-white w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {startCount && (
                  <CountUp
                    start={0}
                    end={1000}
                    duration={2.5}
                    separator=","
                  />
                )}+
              </h3>
              <p className="text-gray-600 font-medium mt-2">Unique Visitors</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaShoppingCart className="text-white w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {startCount && (
                  <CountUp
                    start={0}
                    end={1000}
                    duration={2.5}
                    separator=","
                  />
                )}+
              </h3>
              <p className="text-gray-600 font-medium mt-2">Total Sales</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaStar className="text-white w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {startCount && (
                  <CountUp
                    start={0}
                    end={1000}
                    duration={2.5}
                    separator=","
                  />
                )}+
              </h3>
              <p className="text-gray-600 font-medium mt-2">Customer Satisfaction</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="text-white w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {startCount && (
                  <CountUp
                    start={0}
                    end={1000}
                    duration={2.5}
                    separator=","
                  />
                )}+
              </h3>
              <p className="text-gray-600 font-medium mt-2">Business Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
