import React from "react";
import HighlightText from "./HighlightText";
import KnowYourProgress from "../../../assets/Images/Know_your_progress.svg";
import CompareWithOthers from "../../../assets/Images/Compare_with_others.svg";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./Button";

function LearningLanguageSection() {
  return (
    <div className="mx-auto mt-12 w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-[3.25rem] px-[2rem] py-[6rem]">
      <div className="w-full px-[13.75rem] flex flex-col gap-3 text-center">
        <div className="font-inter font-semibold text-4xl text-richblack-900 leading-[44px] text-center tracking-[-0.02em]">
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>

        <div className="font-inter font-medium text-[16px] leading-6 text-center text-richblack-700">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center">
        <img
          src={KnowYourProgress}
          alt="KnowYourProgress"
          className="object-contain -mr-32"
        />
        <img
          src={CompareWithOthers}
          alt="CompareWithOthers"
          className="object-contain"
        />

        <img
          src={PlanYourLessons}
          alt="PlanYourLessons"
          className="object-contain -ml-36"
        />
      </div>

      <div className="w-full flex justify-center">
        <CTAButton active={true} linkto={"/signup"}>
          Learn more
        </CTAButton>
      </div>
    </div>
  );
}

export default LearningLanguageSection;
