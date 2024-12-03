// "use client";
// import React, { useEffect, useState } from "react";
// import { Nunito_Sans } from "next/font/google";
// import { motion, useAnimation } from "framer-motion";
// import { FaMoneyBillWave, FaCheckCircle, FaUserAlt, FaPercentage } from "react-icons/fa";
// import { IoIosArrowDropright } from "react-icons/io";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { Button } from "@/components/ui/button";
// import schemesData from "../../../data/schemes"; // Import schemesData from your TSX file

// const inter = Nunito_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
// });

// const categories = [
//   "All",
//   "Savings",
//   "Recurring Deposit",
//   "Fixed Deposit",
//   "Income Generation",
//   "Retirement",
//   "Long-term",
//   "Girl Child",
//   "Doubling Investment",
//   "Women Empowerment",
//   "COVID Relief",
//   "Farming",
// ];

// const Schemes = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const controls = useAnimation();
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleScroll = () => {
//     const componentPosition = document.getElementById("schemes")?.getBoundingClientRect()?.top;
//     const screenHeight = window.innerHeight;
//     if (componentPosition && componentPosition < screenHeight && !hasAnimated) {
//       controls.start("visible");
//       setHasAnimated(true);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasAnimated]);

//   const filteredSchemes =
//     selectedCategory === "All"
//       ? schemesData
//       : schemesData.filter((scheme) => scheme.category.includes(selectedCategory));

//   const handleNext = () => {
//     if (currentIndex < filteredSchemes.length - 3) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   return (
//     <motion.div
//       id="schemes"
//       className="px-10 py-16"
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//       }}
//     >
//       <div className={`${inter.className} text-center text-3xl font-extrabold text-[#0D83FD]`}>
//         Schemes
//       </div>
//       <div className="text-center text-lg font-medium text-gray-600 mt-2">
//         Explore your opportunities to success
//       </div>

//       {/* Category Filter */}
//       <div className="flex justify-center mt-8">
//         <select
//           className="border-2 border-[#0D83FD] text-[#0D83FD] bg-white px-4 py-2 rounded-full text-lg focus:outline-none shadow-md hover:shadow-lg transition-shadow"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Carousel Section */}
//       <div className="relative mt-12">
//         <button
//           onClick={handlePrev}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0D83FD] text-white p-3 rounded-full shadow-md hover:bg-[#085CB4]"
//         >
//           ◀
//         </button>
//         <div className="flex overflow-hidden gap-6">
//           {filteredSchemes.slice(currentIndex, currentIndex + 3).map((scheme, index) => (
//             <motion.div
//               key={index}
//               whileHover={{
//                 scale: 1.03,
//                 boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
//                 translateY: -5,
//               }}
//               whileTap={{ scale: 0.97 }}
//               className="bg-white flex flex-col gap-y-4 p-6 justify-start items-center w-[400px] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
//             >
//               <h1 className={`${inter.className} text-xl font-bold text-[#0D83FD]`}>
//                 {scheme.scheme_name}
//               </h1>
//               <p className="text-gray-700 text-center leading-relaxed">{scheme.overview}</p>

//               {/* Eligibility Section */}
//               <div className="flex w-full justify-between gap-4">
//                 <div className="w-1/2">
//                   <h2 className="flex items-center text-lg font-semibold text-[#0D83FD] gap-2">
//                     <FaCheckCircle className="text-xl" /> Eligibility
//                   </h2>
//                   <div className="mt-1 space-y-1 px-2">
//                     {scheme.eligibility.map((eligibility, i) => (
//                       <div key={i} className="flex items-center gap-2">
//                         <FaUserAlt className="text-[#0D83FD]" />
//                         <p>{eligibility}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Key Features Section */}
//                 <div className="w-1/2">
//                   <h2 className="flex items-center text-lg font-semibold text-[#0D83FD] gap-2">
//                     <BsFillShieldLockFill className="text-xl" /> Key Features
//                   </h2>
//                   <div className="mt-1 space-y-1 px-2">
//                     {scheme.key_features.map((feature, i) => (
//                       <div key={i} className="flex items-center gap-2">
//                         <IoIosArrowDropright className="text-[#0D83FD]" />
//                         <p>{feature}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Benefits Section */}
//               <div className="w-full mt-4">
//                 <h2 className="flex items-center text-lg font-semibold text-[#0D83FD] gap-2">
//                   <FaMoneyBillWave className="text-xl" /> Benefits
//                 </h2>
//                 <div className="mt-1 space-y-1 px-3">
//                   {scheme.benefits.map((benefit, i) => (
//                     <div key={i} className="flex items-center gap-2">
//                       <FaPercentage className="text-[#0D83FD]" />
//                       <p>{benefit}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-center w-full gap-6 mt-6">
//                 <Button
//                   className={
//                     "bg-[#0D83FD] hover:bg-transparent border-[#0D83FD] border-2 text-white hover:text-[#0D83FD] rounded-full text-lg py-3 px-6"
//                   }
//                   variant="outline"
//                 >
//                   Read More
//                 </Button>
//                 <Button
//                   className={
//                     "bg-transparent border-[#0D83FD] border-2 rounded-full text-[#0D83FD] hover:bg-[#0D83FD] hover:text-white text-lg py-3 px-6"
//                   }
//                   variant="outline"
//                 >
//                   Apply
//                 </Button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <button
//           onClick={handleNext}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0D83FD] text-white p-3 rounded-full shadow-md hover:bg-[#085CB4]"
//         >
//           ▶
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default Schemes;


"use client";
import React, { useEffect, useState } from 'react';
import { Nunito_Sans } from "next/font/google";
import { motion, useAnimation } from 'framer-motion';
import { FaMoneyBillWave, FaCheckCircle, FaUserAlt, FaPercentage } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import schemesData from '../../../../data/schemes'; // Import schemesData from your TSX file

const inter = Nunito_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

const categories = [
  "All",
  "Savings",
  "Recurring Deposit",
  "Fixed Deposit",
  "Income Generation",
  "Retirement",
  "Long-term",
  "Girl Child",
  "Doubling Investment",
  "Women Empowerment",
  "COVID Relief",
  "Farming",
];

const Schemes = () => {
  const [selectedCategory, setSelectedCategory] = useState("Savings");
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleScroll = () => {
    const componentPosition = document.getElementById('schemes')?.getBoundingClientRect()?.top;
    const screenHeight = window.innerHeight;
    if (componentPosition && componentPosition < screenHeight && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const filteredSchemes = selectedCategory === "All" 
    ? schemesData 
    : schemesData.filter((scheme) => scheme.category.includes(selectedCategory));

  return (
    <>
      <motion.div
        id='schemes'
        className="px-10 py-16"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className={`${inter.className} text-center text-3xl font-extrabold text-[#0D83FD]`}>
          Schemes
        </div>
        <div className="text-center text-lg font-medium text-gray-600 mt-2">
          Explore your opportunities to success
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mt-8">
          <select 
            className="border-2 border-[#0D83FD] text-[#0D83FD] bg-white px-4 py-2 rounded-full text-lg focus:outline-none shadow-md hover:shadow-lg transition-shadow"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Schemes Cards */}
        <div className="flex justify-center gap-6 flex-wrap mt-12">
          {filteredSchemes.map((scheme, index) => (
            <motion.div 
              key={index}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                translateY: -5,
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-white flex flex-col gap-y-4 p-6 justify-start items-center w-[400px] rounded-xl shadow-md hover:shadow-lg h-max transition-all duration-300 ease-in-out"
            >
              <h1 className={`${inter.className} text-xl font-bold text-[#0D83FD]`}>
                {scheme.scheme_name}
              </h1>
              <p className="text-gray-700 text-center leading-relaxed">{scheme.overview}</p>

              {/* Eligibility Section */}
              <div className="flex w-full justify-between gap-4">
                <div className="w-1/2">
                  <h2 className="flex items-center text-lg font-semibold text-[#0D83FD] gap-2">
                    <FaCheckCircle className="text-xl" /> Eligibility
                  </h2>
                  <div className="mt-1 space-y-1 px-2">
                    {scheme.eligibility.map((eligibility, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FaUserAlt className="text-[#0D83FD]" />
                        <p>{eligibility}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features Section */}
                <div className="w-1/2">
                  <h2 className="flex items-center text-lg font-semibold text-[#0D83FD] gap-2">
                    <BsFillShieldLockFill className="text-xl" /> Key Features
                  </h2>
                  <div className="mt-1 space-y-1 px-2">
                    {scheme.key_features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <IoIosArrowDropright className="text-[#0D83FD]" />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="w-full mt-4">
                <h2 className="flex items-center text-lg font-semibold text-[#0D83FD] gap-2">
                  <FaMoneyBillWave className="text-xl" /> Benefits
                </h2>
                <div className="mt-1 space-y-1 px-3">
                  {scheme.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FaPercentage className="text-[#0D83FD]" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center w-full gap-6 mt-6">
                <Button
                  className={"bg-[#0D83FD] hover:bg-transparent border-[#0D83FD] border-2 text-white hover:text-[#0D83FD] rounded-full text-lg py-3 px-6"}
                  variant="outline"
                >
                  Read More
                </Button>
                <Button
                  className={"bg-transparent border-[#0D83FD] border-2 rounded-full text-[#0D83FD] hover:bg-[#0D83FD] hover:text-white text-lg py-3 px-6"}
                  variant="outline"
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Schemes;
