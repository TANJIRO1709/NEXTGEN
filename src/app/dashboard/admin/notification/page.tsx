import React from "react";

const Page = () => {
  return (
    <div className="font-[sans-serif] max-w-md mx-auto mt-10 p-2">
      <form>
        <input
          type="text"
          placeholder="Enter username"
          className="pr-4 px-5 py-2.5 text-sm text-black rounded-sm bg-white border border-gray-300 w-full outline-none"
        />
        <p className="text-xs text-red-500 flex items-center mt-2"></p>
        <textarea
          placeholder="Type Message"
          className="p-4 bg-white max-w-md mx-auto w-full block text-sm border border-gray-300 outline-[#007bff] rounded mt-4"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-[#007bff] text-white px-5 py-2.5 rounded-sm w-full hover:bg-[#0056b3] transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Page;
