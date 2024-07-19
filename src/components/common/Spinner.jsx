import React from "react";

function Spinner() {
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
