import React, { useEffect, useRef } from 'react'
import { steps } from '../../../Data/Data';

export const Stepper = ({currentStep, setStepPosition}) => {
   const stepRef = useRef([]);

   useEffect(() =>{
    const el= stepRef.current[currentStep];
   console.log("the el is",el)

    if(!el) return;
    setStepPosition({
      left: el.offsetLeft,
      width: el.offsetWidth,
    })

   }, [currentStep, setStepPosition])

  return (
    <div className='flex items-center gap-3 w-fit'>
        {steps.map((step, index) => (
            <div key={index} 
            ref={(el) => (stepRef.current[index] = el)}
            className='flex items-center'>
                <div 
                 className={[
                    "w-4 h-4 rounded-full border-2",
                    currentStep > index
                         ? "border-green-600 bg-green-600"
                         : currentStep === index
                         ? "border-green-600 bg-white"
                         : "border-gray-400 bg-white", 
                 ].join(" ")}
                >
                </div>
                <span
                 className={
                    "ml-2 text-sm " +
                    (currentStep === index ? "font-semibold text-black" : "text-gray-500")
                 }
                >
                 {step.label}
                </span>
                {index < steps.length - 1 && (
                <span className="text-gray-400 mx-2">›</span>
               )}
            </div>
        ))}
    </div>
  )
};
