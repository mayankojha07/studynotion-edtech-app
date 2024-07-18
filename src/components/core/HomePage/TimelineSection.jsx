import React, { Fragment } from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

function TimelineSection() {
  const timeline = [
    {
      logo: Logo1,
      heading: "Leadership",
      desc: "Fully committed to the success company",
    },
    {
      logo: Logo2,
      heading: "Responsibility",
      desc: "Students will always be our top priority",
    },
    {
      logo: Logo3,
      heading: "Flexibility",
      desc: "The ability to switch is an important skills",
    },
    {
      logo: Logo4,
      heading: "Solve the problem",
      desc: "Code your way to a solution",
    },
  ];

  return (
    <div className="mx-auto w-11/12 max-w-maxContent flex flex-col sm:flex-row justify-between items-center gap-[4rem] px-[2rem] py-[3rem]">
      <div className="flex flex-col items-start gap-4 w-full sm:w-[50%]">
        {timeline.map((element, index) => {
          return (
            <Fragment key={index}>
              <div className="flex items-center justify-between gap-6 px-[1rem] py-3">
                <div className="flex justify-center items-center rounded-full w-[52px] aspect-square p-1 shadow-[0px_0px_62px_0px_#0000001F] bg-white">
                  <img src={element.logo} alt={element.heading} />
                </div>

                <div className="flex flex-col items-start justify-between gap-[2px]">
                  <div className="text-[18px] font-inter font-semibold leading-6 text-richblack-800">
                    {element.heading}
                  </div>
                  <div className="font-inter font-normal text-[14px] leading-[22px] text-richblack-700">
                    {element.desc}
                  </div>
                </div>
              </div>
              {index !== timeline.length - 1 ? (
                <div className="w-[1px] border-r-[2px] border-richblack-100 h-[35px] border-dotted ml-[40px] -my-5"></div>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      <div className="w-full relative shadow-blue-200">
        <img
          src={TimelineImage}
          alt="Timeline Image"
          className="w-full object-cover"
        />

        <div className="flex justify-center items-center p-10 gap-5 sm:gap-[52px] bg-caribbeangreen-700 sm:absolute sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]">
          <div className="flex items-center w-[160px] justify-between gap-4 sm:gap-6">
            <div className="text-4xl leading-11 tracking-[-0.02em] text-center font-bold text-white">
              10
            </div>

            <div className="font-inter font-medium text-[14px] leading-6 text-caribbeangreen-300">
              YEARS OF EXPERIENCES
            </div>
          </div>

          <div className="border-r-2 w-[1px] border-caribbeangreen-500 h-[44px]"></div>

          <div className="flex items-center w-[160px] justify-between gap-4 sm:gap-6">
            <div className="text-4xl leading-11 tracking-[-0.02em] text-center font-bold text-white">
              250
            </div>

            <div className="font-inter font-medium text-[14px] leading-6 text-caribbeangreen-300">
              TYPES OF COURSES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
