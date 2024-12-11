"use client"
import React, { useState } from "react";

const ButtonGroup = () => {
  const [selected, setSelected] = useState("Left");

  const handleButtonClick = (button) => {
    setSelected(button);
  };

  return (
    <div className="font-[sans-serif] w-max mx-auto bg-blue-600 rounded-lg overflow-hidden flex">
      <button
        type="button"
        onClick={() => handleButtonClick("Left")}
        className={`px-6 py-3 text-sm tracking-wider font-semibold border-none outline-none 
          ${
            selected === "Left"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          } hover:bg-blue-700 active:bg-blue-600`}
      >
        User
      </button>
      <button
        type="button"
        onClick={() => handleButtonClick("Middle")}
        className={`px-6 py-3 text-sm tracking-wider font-semibold border-none outline-none 
          ${
            selected === "Middle"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          } hover:bg-blue-700 active:bg-blue-600`}
      >
        Admin
      </button>
    </div>
  );
};

export default ButtonGroup;
