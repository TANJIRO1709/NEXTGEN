import React from "react";

import { FaCheckCircle } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { TbPoint } from "react-icons/tb";



function Card({ name, overview }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl max-w-sm w-96 mx-auto mt-4 min-h-[350px] flex flex-col justify-between">
      <div>
        <h3 className={` text-lg font-semibold text-gray-800`}>{name}</h3>
        <p className={` mt-2 text-sm text-gray-600 leading-relaxed`}>
          {overview}
        </p>
      </div>
      <div className="text-right">
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Card;
