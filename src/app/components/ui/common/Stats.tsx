"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserFriends, FaShoppingCart, FaStar,FaChartLine } from "react-icons/fa";


const Stats = () => {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (isInView) => {
      if (isInView) setStartCount(true);
    },
  });

  return (
    <div ref={ref} className="pt-12">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-x-6 gap-y-12 divide-x divide-gray-300">
        
        <div className="text-center">
          <FaUserFriends className="text-blue-600 w-10 h-10 inline-block" />
          <h3 className="text-3xl font-extrabold text-blue-600 mt-5">
            {startCount && (
            <CountUp
              start={0}
              end={1000}
              duration={5}
              
            />
          )}</h3>
          <p className="text-base text-gray-800 font-semibold mt-3">Unique Visitors</p>
        </div>

        <div className="text-center">
          <FaShoppingCart className="text-blue-600 w-8 h-8 inline-block" />
          <h3 className="text-3xl font-extrabold text-blue-600 mt-5">{startCount && (
            <CountUp
              start={0}
              end={1000}
              duration={5}
              
            />
          )}</h3>
          <p className="text-base text-gray-800 font-semibold mt-3">Total Sales</p>
        </div>

        <div className="text-center">
          <FaStar className="text-blue-600 w-8 h-8 inline-block" />
          <h3 className="text-3xl font-extrabold text-blue-600 mt-5">{startCount && (
            <CountUp
              start={0}
              end={1000}
              duration={5}
             
            />
          )}</h3>
          <p className="text-base text-gray-800 font-semibold mt-3">Customer Satisfaction</p>
        </div>

        <div className="text-center">
          <FaChartLine className="text-blue-600 w-8 h-8 inline-block" />
          <h3 className="text-3xl font-extrabold text-blue-600 mt-5">{startCount && (
            <CountUp
              start={0}
              end={1000}
              duration={5}
          
            />
          )}</h3>
          <p className="text-base text-gray-800 font-semibold mt-3">Business Growth</p>
        </div>

      </div>
    </div>
  );
};

export default Stats;
