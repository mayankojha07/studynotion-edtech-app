import React from "react";

function OutletPath({ outletName }) {
  return (
    <div className="w-full p-8 flex flex-col gap-3">
      <div className="text-sm font-normal text-richblack-300 leading-5">
        Home / Dashboard /{" "}
        <span className="text-yellow-50 font-medium">{outletName}</span>
      </div>
      <h1 className="text-3xl font-medium text-richblack-5">{outletName}</h1>
    </div>
  );
}

export default OutletPath;
