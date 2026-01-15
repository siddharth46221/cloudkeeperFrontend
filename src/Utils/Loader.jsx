import React from "react";

const Loader = () => {
  return (
    <div className="w-full grid place-content-center ">
      <style>
        {`
          @keyframes rectPulse {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.6); }
          }
        `}
      </style>

      <div className="flex items-end justify-center h-16 space-x-2">

        <div
          className="w-2.5 h-5 bg-sky-500"
          style={{
            animation: "rectPulse 0.8s ease-in infinite",
            animationDelay: "0s",
          }}
        />

        <div
          className="w-2.5 h-5 bg-blue-600"
          style={{
            animation: "rectPulse 0.8s ease-out infinite",
            animationDelay: "0.4s",
          }}
        />

        <div
          className="w-2.5 h-5 bg-blue-800"
          style={{
            animation: "rectPulse 0.8s ease-in infinite",
            animationDelay: "0.8",
          }}
        />

      </div>
    </div>
  );
};

export default Loader;