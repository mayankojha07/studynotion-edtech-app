import React from "react";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} w-full justify-between my-20 gap-10`}>
      {/* Section 1 */}
      <div className="flex flex-col w-[50%] gap-8">
        {heading}

        <div className="text-richblack-300 font-[500]">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRightLong />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-fit w-[100%] py-4 mx-auto flex flex-row  justify-center gap-2">
        {/* //TODO: HW --> Background Gradient */}

        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-[500]">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-[500] font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
