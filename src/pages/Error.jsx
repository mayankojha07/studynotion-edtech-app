import React from "react";

function Error({ message = "Error - 404 Page Not Found" }) {
  return (
    <div className="w-full min-h-[calc(100vh-3.6rem)] mx-auto max-w-maxContent flex justify-center items-center">
      <div className="text-3xl text-pure-greys-500">{message}</div>
    </div>
  );
}

export default Error;
