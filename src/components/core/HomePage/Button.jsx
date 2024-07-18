import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkto }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[16px] px-6 py-3 rounded-md font-medium leading-6 ${
          active
            ? "bg-yellow-50 text-richblack-900 shadow-[#FFFFFF82]"
            : "bg-richblack-800 text-richblack-5 shadow-[#FFFFFF2E]"
        } hover:scale-95 transition-all duration-200 shadow-[-2px_-2px_0px_0px_inset]`}
      >
        {children}
      </div>
    </Link>
  );
}

export default Button;
