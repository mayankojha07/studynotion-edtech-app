import React from "react";
import { Link } from "react-router-dom";

function Button({ children, path }) {
  return (
    <Link to={path}>
      <button className="flex items-center justify-center py-2 px-3 rounded-lg border border-richblack-700 bg-richblack-800 font-inter font-medium text-[1rem] text-richblack-100 leading-6 text-center ">
        {children}
      </button>
    </Link>
  );
}

export default Button;
