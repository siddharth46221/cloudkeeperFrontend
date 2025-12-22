import React from "react";
import { CodeCopy } from "../CodeCopy/CodeCopy";
import { code, code2 } from "../../../Data/Data";
import { CopyRole } from "../CopyRole/CopyRole";
import image1 from "../../../assets/IamImage1.png";

export const Step1 = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          1
        </div>
        <p className="tracking-wide">
          Log in to AWS Account &{" "}
          <span className="text-blue-500 underline">Create an IAM Role.</span>
        </p>
      </div>
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          2
        </div>
        <p>
          In the <span className="italic">Trusted entity type</span> section,
          select
          <strong> Custom trust policy. </strong>
          Replace the prefilled policy with the policy provided below -
        </p>
      </div>

      <CodeCopy code={JSON.stringify(code, null, 2)} />

      <div className="flex gap-3 mt-4">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          3
        </div>
        <p className="tracking-wide">
          Click on <strong>Next </strong> 
          to go to the <span className="italic"> Add permissions page. </span>
          We would not be adding any permissions for now because the permission
          policy content will be dependent on the AWS Account ID retrieved from
          the IAM Role. Click on
          <strong> Next </strong> 
        </p>
      </div>
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          4
        </div>
        <p className="tracking-wide">
          In the <span className="italic"> Role name field,</span> enter the
          below-mentioned role name, and click on
          <strong> Create Role - </strong> 
        </p>
      </div>

      <CopyRole code2={code2}/>
      
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          5
        </div>
        <p className="tracking-wide">
          Go to the newly create IAM Role and copy the Role ARN -
        </p>
      </div>

      <img src={image1} alt="Image of IAM" />

      <div className="flex gap-3 pt-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          6
        </div>
        <p className="tracking-wide">
            Paste the copied Role ARN below -
        </p>
      </div>

      <div className="flex flex-col ">
        <label className="text-sm text-gray-600">Enter the IAM Role ARN <span className="text-red-500">*</span></label>
        < input 
          className="h-11 w-[474px] border border-gray-300 rounded-md p-3" 
          placeholder="Enter the IAM Role ARN"
          />
      </div>

      
    </div>
  );
};
