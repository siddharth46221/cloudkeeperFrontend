import React from "react";
import image2 from "../../../assets/A5-Dh6erahN.png";
import image3 from "../../../assets/inline-2-C2f4crRt.png";
import image4 from "../../../assets/onboarding_steps_customer_managed-DqrQlava.png";

export const Step2 = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          1
        </div>
        <p className="tracking-wide">
          Go to the{" "}
          <span className="text-blue-500 font-semibold underline">
            CK Tuner Role.
          </span>
        </p>
      </div>
      <img src={image2} alt="Image of IAM" />
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          2
        </div>
        <p>
          In permission policy, click on
          <strong> Add permissions {`>`} Attach Policy </strong>
        </p>
      </div>

      <img src={image3} alt="Image of IAM" />

      <div className="flex gap-3 mt-4">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          3
        </div>
        <p className="tracking-wide">
          Filter by Type {`>`} Customer managed then search for{" "}
          <strong>
            {" "}
            cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
            cktuner-TunerReadEssentials{" "}
          </strong>
          and select them.
        </p>
      </div>
      <img src={image4} alt="Image of IAM" />
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          4
        </div>
        <p className="tracking-wide">
          Now ,click on
          <strong> Add permissions </strong>
        </p>
      </div>
    </div>
  );
};
