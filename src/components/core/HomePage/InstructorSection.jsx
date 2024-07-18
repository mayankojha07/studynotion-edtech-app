import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";

function InstructorSection() {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent flex flex-col sm:flex-row items-center justify-between px-[2rem] py-[5rem] pt-[6rem] gap-[98px]">
      <div className="w-full shadow-blue-200">
        <img
          src={Instructor}
          alt="Instructor"
          className="w-full object-cover shadow-[-20px_-20px_0px_0px_#FFFFFF]"
        />
      </div>

      <div className="w-full sm:w-[70%] flex flex-col items-start justify-between gap-3">
        <div className="font-inter font-semibold text-4xl leading-[44px] tracking-[-0.02em] text-white w-[50%]">
          Become an <HighlightText text={"Instructor"} />
        </div>

        <p className="font-inter font-medium text-[16px] leading-6 text-richblack-300">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>

        <div className="pt-[3.25rem]">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex flex-row items-center justify-center gap-2">
              <span>Start Teaching Today</span> <FaArrowRightLong />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
