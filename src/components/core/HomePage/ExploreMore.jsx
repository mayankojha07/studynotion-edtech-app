import React, { useState } from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

function ExploreMore() {
  const tabNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    // console.log("VALUE --> ", value);
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    // console.log("RESULT --> ", result);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  // console.log("courses --> ", courses);
  // console.log("currentCard --> ", currentCard);

  return (
    <div className="w-full">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center px-[2rem] py-[3rem] gap-[98px]">
        <div className="w-full flex flex-col items-center justify-between gap-9">
          {/* Heading */}
          <div className="w-full flex flex-col items-center justify-between gap-[8px]">
            <div className="font-inter font-semibold text-4xl text-white leading-[44px] tracking-[-0.02em] text-center">
              Unlock the <HighlightText text={"Power of Code"} />
            </div>

            <p className="font-inter font-medium text-[16px] leading-6 text-richblack-300 text-center">
              Learn to Build Anything You Can Imagine
            </p>
          </div>

          {/* Tabs */}
          <div className="p-1 rounded-full bg-richblack-800 text-richblack-200 transition-all duration-200 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] flex flex-row gap-[5px] font-medium items-center justify-center">
            {tabNames.map((element, index) => {
              return (
                <div
                  key={index}
                  className={`font-inter flex items-center justify-center gap-[10px] ${
                    currentTab === element
                      ? "bg-richblack-900 text-richblack-5 font-medium"
                      : "text-richblack-200"
                  } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-[18px] py-[6px] leading-6`}
                  onClick={() => setMyCard(element)}
                >
                  {element}
                </div>
              );
            })}
          </div>

          {/* Cards */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-[32px] px-[3.25rem] gap-[36px]">
            {courses.map((element, index) => {
              return (
                <CourseCard
                  key={index}
                  cardData={element}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                />
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-between gap-6 pt-8">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center justify-center gap-[8px]">
                <span>Explore Full Catalog</span>
                <FaArrowRightLong />
              </div>
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Learn more
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreMore;
