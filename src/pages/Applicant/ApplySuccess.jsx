import React from "react";
import Success from "../../assets/success.png";
const ApplySuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={Success} alt="Success" className="w-28 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        🎉 Your application was sent!
      </h1>
      <p className="text-[#404040] text-center max-w-sm mb-2">
        Congratulations! You've taken the first step towards a rewarding career
        at Rakamin. We look forward to learning more about you during the
        application process.
      </p>
    </div>
  );
};

export default ApplySuccess;
