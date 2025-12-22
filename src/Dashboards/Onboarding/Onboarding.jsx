import React, { useState } from "react";
import { steps } from "../../Data/Data";
import { Stepper } from "../../Pages/Onboarding/ProgressBar/Stepper";
// import { ProgressLine } from "../../Pages/Onboarding/ProgressBar/ProgressLine";
import { Outlet, useNavigate } from "react-router-dom";

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPosition, setStepPosition] = useState(0);
  console.log("the step position is this",stepPosition)
  const navigate = useNavigate();

  function nextStep() {
    if (currentStep < steps.length - 1) {
      
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      navigate(steps[nextStepIndex].path);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      navigate(steps[prevStepIndex].path);
    }
  }

  return (
    <div className="bg-gray-50 h-full overflow-auto">
      <div className="pl-10 pr-10 pt-10">
        <Stepper currentStep={currentStep}
                 setStepPosition={setStepPosition}
        />
        {/* <ProgressLine stepPosition={stepPosition} /> */}
      </div>
      

      <div className="bg-gray-200  pt-8 p-4 h-[calc(100%-87px)] overflow-y-auto">
        <h2 className="text-2xl font-bold ml-15">{steps[currentStep]?.title}</h2>
        <p className="ml-15 mt-2 text-gray-700">{steps[currentStep]?.subtitle}</p>



        <div className="ml-15 mr-15 mt-3.5 p-10 bg-white rounded-md border-gray-50 ">
          
          <Outlet />
        </div>




        <div className="ml-7 mr-7 mt-5 flex items-center justify-between">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md bg-white hover:bg-gray-100">
            Cancel
          </button>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-5 py-2 border border-gray-400 text-gray-700 rounded-md bg-white hover:bg-gray-100"
              >
                Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Next · {steps[currentStep + 1]?.label}
              </button>
            ) : (
              <button className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
