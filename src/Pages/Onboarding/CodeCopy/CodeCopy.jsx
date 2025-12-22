import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

export const CodeCopy = ({ code }) => {
  const [popup, setPopup] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setPopup(true);

    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <>
    
      {popup && (
        <div className="fixed top-20 right-6 bg-white border border-green-400 shadow-lg px-4 py-2 rounded-lg flex items-center gap-2 animate-fadeIn z-50">
          <FaCheckCircle className="text-green-600" size={18} />
          <span className="text-green-700 font-medium text-sm">Data copied</span>
        </div>
      )}

      
      <div className="relative bg-gray-100 border border-[#D5DCEC] rounded-md shadow-sm p-3 mt-2">

        
        <button
          className="absolute top-2 right-8 bg-white border border-gray-300 p-1 rounded hover:bg-blue-700 hover:text-white"
          onClick={handleCopy}
        >
          <FiCopy size={16}  />
        </button>

        <pre className="overflow-x-auto overflow-y-auto max-h-72 text-[12px] text-blue-700 pr-8 whitespace-pre-wrap font-medium">
          {code}
        </pre>
      </div>
    </>
  );
};
