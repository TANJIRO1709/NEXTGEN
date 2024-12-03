import React from "react";
import { Nunito_Sans } from "next/font/google";
import { FaCheckCircle } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { TbPoint } from "react-icons/tb";
const inter = Nunito_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

// function Card() {
//   return (
//     // <div className="card bg-white w-96 shadow-md hover:shadow-xl rounded-md">
//     //   <div className="card-body">
//     //     <h2 className={`${inter.className} font-[400] text-[21px] card-title`}>{name}</h2>
//     //     <ul>
//     //       <li><TbPoint />Interest Rate: 4.0% annually, with tax exemptions up to ₹10,000 under Section 80TTA.</li>          
//     //       <li>Low Maintenance: ₹500 minimum balance, ₹10 minimum deposit, ₹50 minimum withdrawal.</li>          
//     //       <li>Secure & Flexible: No deposit limit; government-backed safety.</li>          
//     //       <li>Eligibility: Single adults, joint accounts, minors (10+ independently).</li>          
//     //       <li>Digital Access: ATM cards, eBanking, mobile banking, and cheque books.</li>          
//     //       <li>Rural Benefits: Start saving with ₹10, accessible at all post offices, linked to APY, PMSBY, and PMJJBY schemes.</li>          
//     //     </ul>
//     //     <div className="card-actions justify-center">
//     //       <button className="btn btn-primary bg-[#0D83FD] hover:bg-[#3195FD] text-white text-[17px] w-[40%] py-2 mt-2 rounded-[700px]">Read More!</button>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="bg-white w-[350px] rounded-lg shadow-md hover:shadow-lg h-max">
//         <div>this is it</div>
//     </div>
//   );
// }

function Card({name,overview}){
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          {overview}
        </p>
        <button
          type="button"
          className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};


export default Card;
