import React from "react";

function IconBtn({
  text,
  onclick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`flex items-center justify-center gap-x-2 cursor-pointer rounded-md py-2 px-5 font-semibold text-richblack-900 ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } ${customClasses}`}
    >
      {children ? (
        <>
          <span className="w-fit">{text}</span> {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default IconBtn;
