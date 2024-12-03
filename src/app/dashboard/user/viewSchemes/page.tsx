"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Card from "@/app/components/ui/common/Card";
import { DashboardLayout } from "../DashboardLayout";

const App = () => {
  const [values, setValues] = useState<{ name: string; overview: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState(""); // Initialize state for selected value
  
  const details = {
    All:[
        {"name": "Post Office Savings Account (SB)", "overview": "A basic savings account offered by the post office with attractive interest rates and low minimum balance requirements."},
        {"name": "National Savings Recurring Deposit Account (RD) – 5-Year Post Office RD Scheme", "overview": "A recurring deposit scheme with a tenure of 5 years, offering guaranteed returns and interest compounded quarterly."},
        {"name": "National Savings Time Deposit Account (TD) – Post Office Time Deposit Scheme", "overview": "Fixed deposit scheme with tenures of 1, 2, 3, or 5 years, offering higher interest rates for longer terms."},
        {"name": "National Savings Monthly Income Scheme Account (MIS)", "overview": "Designed for regular monthly income, suitable for retirees and those seeking stable income."},
        {"name": "Senior Citizen Savings Scheme (SCSS)", "overview": "Exclusively for individuals aged 60 and above, offering attractive interest rates and tax benefits."},
        {"name": "Public Provident Fund (PPF) Account", "overview": "A long-term savings scheme with a tenure of 15 years, offering tax-exempt returns and a high degree of safety."},
        {"name": "Sukanya Samriddhi Account (SSA)", "overview": "A savings scheme for the girl child, offering high interest rates and tax benefits, with funds accessible after maturity or for educational purposes."},
        {"name": "National Savings Certificates (NSC – VIIIth Issue)", "overview": "A secure investment option with fixed returns and tax savings, typically suited for long-term wealth building."},
        {"name": "Kisan Vikas Patra (KVP)", "overview": "A savings instrument that doubles your investment in a fixed period, based on the applicable interest rate."},
        {"name": "Mahila Samman Savings Certificate, 2023", "overview": "A special savings scheme for women, offering fixed deposits with attractive returns."},
        {"name": "PM CARES for Children Scheme, 2021", "overview": "Provides financial assistance, scholarships, and healthcare for children orphaned due to COVID-19."},
        {"name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)", "overview": "Offers direct financial support of ₹6,000 per year to small and marginal farmers in three installments."},
        {"name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)", "overview": "A crop insurance scheme offering protection against crop loss due to natural disasters, pests, and diseases."},
        {"name": "Soil Health Card Scheme (SHC)", "overview": "Promotes sustainable agriculture by providing farmers with soil health reports and recommendations for crop nutrients."},
        {"name": "Kisan Credit Card (KCC)", "overview": "Provides short-term credit to farmers for agricultural needs at low-interest rates with flexible repayment options."}     
    ],
    Farmer: [
      {"name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)", "overview": "Offers direct financial support of ₹6,000 per year to small and marginal farmers in three installments."},
      {"name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)", "overview": "A crop insurance scheme offering protection against crop loss due to natural disasters, pests, and diseases."},
      {"name": "Soil Health Card Scheme (SHC)", "overview": "Promotes sustainable agriculture by providing farmers with soil health reports and recommendations for crop nutrients."},
      {"name": "Kisan Credit Card (KCC)", "overview": "Provides short-term credit to farmers for agricultural needs at low-interest rates with flexible repayment options."}
    ]
    
    ,
    Children: [
      {"name": "PM CARES for Children Scheme, 2021", "overview": "Provides financial assistance, scholarships, and healthcare for children orphaned due to COVID-19."},
      {"name": "Sukanya Samriddhi Account (SSA)", "overview": "A savings scheme for the girl child, offering high interest rates and tax benefits, with funds accessible after maturity or for educational purposes."}
    ]
    
    ,
    Women: [
      {"name": "Mahila Samman Savings Certificate, 2023", "overview": "A special savings scheme for women, offering fixed deposits with attractive returns."}
    ]
    ,
    Senior: [
      {"name": "Senior Citizen Savings Scheme (SCSS)", "overview": "Exclusively for individuals aged 60 and above, offering attractive interest rates and tax benefits."}
    ]
    ,
    Others: [
      {"name": "Post Office Savings Account (SB)", "overview": "A basic savings account offered by the post office with attractive interest rates and low minimum balance requirements."},
      {"name": "National Savings Recurring Deposit Account (RD) – 5-Year Post Office RD Scheme", "overview": "A recurring deposit scheme with a tenure of 5 years, offering guaranteed returns and interest compounded quarterly."},
      {"name": "National Savings Time Deposit Account (TD) – Post Office Time Deposit Scheme", "overview": "Fixed deposit scheme with tenures of 1, 2, 3, or 5 years, offering higher interest rates for longer terms."},
      {"name": "National Savings Monthly Income Scheme Account (MIS)", "overview": "Designed for regular monthly income, suitable for retirees and those seeking stable income."},
      {"name": "Public Provident Fund (PPF) Account", "overview": "A long-term savings scheme with a tenure of 15 years, offering tax-exempt returns and a high degree of safety."},
      {"name": "National Savings Certificates (NSC – VIIIth Issue)", "overview": "A secure investment option with fixed returns and tax savings, typically suited for long-term wealth building."},
      {"name": "Kisan Vikas Patra (KVP)", "overview": "A savings instrument that doubles your investment in a fixed period, based on the applicable interest rate."}
    ]
  };

  type DetailKeys = keyof typeof details; // Define keys type

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as DetailKeys; // Cast to DetailKeys
    setSelectedValue(selected);
    setValues(details[selected]); // Update the state with the corresponding array
  };

  return (
    <DashboardLayout>
      <div className="p-6 mx-auto max-w-7xl">
        <motion.div
          className="mb-6 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label
            htmlFor="options"
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            Filter by:
          </label>
          <select
            id="options"
            value={selectedValue}
            onChange={handleSelectChange}
            className="block w-full bg-white p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#0D83FD] focus:border-[#0D83FD] transition ease-in-out"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="All">All</option>
            <option value="Farmer">Farmer</option>
            <option value="Women">Women</option>
            <option value="Senior">Senior</option>
            <option value="Children">Children</option>
            <option value="Others">Others</option>
          </select>
        </motion.div>

        {selectedValue && (
          <motion.p
            className="mb-8 px-6 max-w-screen-lg text-xl font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Showing results for:{" "}
            <span className="text-[#0D83FD]">{selectedValue}</span>
          </motion.p>
        )}

        <motion.div
          className="flex flex-wrap gap-5 justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ staggerChildren: 0.2 }}
        >
          {values.map((item, index) => (
            <motion.div
              key={index}
              className="card-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card name={item.name} overview={item.overview} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default App;
