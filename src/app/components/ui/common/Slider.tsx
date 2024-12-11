import React from "react";
import Marquee from "react-fast-marquee";

const NewTag = () => (
  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mx-2 inline-flex items-center">
    New
  </span>
);

const Slider = () => (
  <Marquee className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-3">
    <div className="flex items-center">
      <span className="text-white font-semibold px-8 flex items-center">
        <NewTag /> Extension of dateline of Sukanya Samriddhi Yojana (SSA) 24-25 up to 31.12.2025 (6:00PM)
      </span>
      <span className="text-white font-semibold px-8 flex items-center">
        <NewTag /> Monthly Income Scheme (MIS): Last date for registration extended to December 31, 2024
      </span>
      <span className="text-white font-semibold px-8 flex items-center">
        <NewTag /> Senior Citizen Savings Scheme (SCSS): Interest rate increased to 8.2% for Q3 FY 2024-25
      </span>
      <span className="text-white font-semibold px-8 flex items-center">
        <NewTag /> PM Kisan Patra (KVP): 15th installment to be released soon
      </span>
      <span className="text-white font-semibold px-8 flex items-center">
        <NewTag /> Atal Pension Yojana (APY): New enrollment target set for FY 2024-25
      </span>
    </div>
  </Marquee>
);

export default Slider;
