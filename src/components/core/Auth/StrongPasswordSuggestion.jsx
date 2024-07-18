import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

function StrongPasswordSuggestion({ text }) {
  return (
    <div className="flex justify-start items-center gap-[6px] text-caribbeangreen-300 text-[13px] leading-[20px] w-full sm:w-[40%]">
      <FaCircleCheck /> <spna>{text}</spna>
    </div>
  );
}

export default StrongPasswordSuggestion;
