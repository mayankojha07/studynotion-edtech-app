import React from "react";
import ReviewSlider from "../../common/ReviewSlider";

function ReviewSection() {
  return (
    <>
      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col px-[2rem] py-[3rem] gap-[52px]">
        <h2 className="w-full px-[220px] font-inter font-semibold text-4xl text-white leading-[44px] text-center tracking-[0.02em]">
          Reviews from other learners
        </h2>
        {/* // Todo: Review Slider here */}
        <ReviewSlider />
      </div>
    </>
  );
}

export default ReviewSection;
