import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

export const CopyRole = ({ code2 }) => {
  const [popuop, setPopup] = useState(false);

  function handlePopup() {
    navigator.clipboard.writeText(code2);
    setPopup(true);
console.log("copied");
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  }

  return (
    <div>
      {popuop && (
        <div className="fixed top-20 right-6 bg-white border border-green-400 shadow-lg px-4 py-2 rounded-lg flex items-center gap-2 animate-fadeIn z-50">
          <FaCheckCircle className="text-green-600" size={18} />
          <span className="text-green-700 font-medium text-sm">
            Data copied
          </span>
        </div>
      )}

      <div className="w-96 h-10 bg-gray-100 border border-[#D5DCEC] rounded-md shadow-sm p-2 mt-2 mx-9 flex">
    
        <div 
        onClick={handlePopup}
        className="bg-white border border-gray-300 p-1 rounded hover:bg-blue-700 hover:text-white">
          <FiCopy size={16}  />
          
        </div>
        <span className="ml-2 font-medium">{code2.role}</span>
      </div>
    </div>
  );
};
