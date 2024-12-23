import React from "react";
import IconBtn from "./IconBtn";

function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 !m-0 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[21.875rem] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>
        <p className="mt-1 mb-5 leading-6 text-richblack-200">
          {modalData.text2}
        </p>

        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            onClick={modalData?.btn2Handler}
            className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
