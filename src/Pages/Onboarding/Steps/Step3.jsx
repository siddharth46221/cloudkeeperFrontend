import React from "react";
import image5 from "../../../assets/E2-C6N9LpCy.png";
import { code3, code4 } from "../../../Data/Data";
import { CopyRole } from "../CopyRole/CopyRole";
import image6 from "../../../assets/E3-quBsiSty.png";
import image7 from "../../../assets/5.3.png";

export const Step3 = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          1
        </div>
        <p className="tracking-wide">
          Go to{" "}
          <span className="text-blue-500 font-semibold underline">
            Cost and Usage Reports
          </span>{" "}
          in the Billing Dashboard and click on Create report.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          2
        </div>
        <p>
          Name the report as shown below and select the Include resource IDs
          checkbox -<strong> Include resource IDs </strong>checkbox -
        </p>
      </div>

      <CopyRole code2={code3} />

      <img src={image5} alt="Image of IAM" />

      <div className="flex gap-3 mt-4">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          3
        </div>
        <p className="tracking-wide">
          In Configure S3 Bucket,{" "}
          <strong>provide the name of the S3 bucket that was created -</strong>
        </p>
      </div>

      <img className="mt-2" src={image6} alt="Image of IAM" />

      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          4
        </div>
        <p className="tracking-wide">
          In the Delivery options section, enter the below-mentioned Report path
          prefix -
        </p>
      </div>
      <div className="text-sm text-gray-400">Report Path Prefix</div>
      <CopyRole code2={code4} />
      <img src={image7} alt="Image of IAM" />

      <div className="flex gap-3">
        <div className="rounded-full bg-blue-500/50 w-[22px] h-[22px] text-center text-white">
          5
        </div>
        <p>
          Click on Next. Now, review the configuration of the Cost and Usage
          Report. Once satisfied, click on Create Report.
        </p>
      </div>
    </div>
  );
};
