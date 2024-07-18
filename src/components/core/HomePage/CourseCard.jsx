import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

function CourseCard({ cardData, currentCard, setCurrentCard }) {
  // console.log("CardData --> ", cardData);
  // console.log("CurrentCard --> ", currentCard);
  return (
    <div
      className={`w-[30%] flex flex-col justify-center items-center ${
        cardData.heading === currentCard
          ? "shadow-[12px_12px_0px_0px_#FFD60A] bg-white"
          : "bg-richblack-800"
      }`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className="px-6 pt-8 pb-[3.25rem] flex flex-col justify-between items-start text-left gap-3">
        <div
          className={`font-inter font-semibold text-[20px] leading-7 ${
            cardData.heading === currentCard
              ? "text-richblack-800"
              : "text-white"
          }`}
        >
          {cardData.heading}
        </div>
        <div
          className={`font-inter font-normal text-[16px] leading-6 ${
            cardData.heading === currentCard
              ? "text-richblack-500"
              : "text-richblack-400"
          }`}
        >
          {cardData.description}
        </div>
      </div>

      <div
        className={`w-full flex flex-row items-center justify-between gap-4 px-6 py-4 border-t-2 border-dashed ${
          cardData.heading === currentCard
            ? "border-richblack-50 text-blue-500"
            : "border-richblack-600 text-richblack-300"
        }`}
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <HiMiniUsers width={20} height={20} /> <span>{cardData.level}</span>
        </div>

        <div className="flex flex-row items-center justify-center gap-2">
          <ImTree width={18} height={18} />{" "}
          <span>{cardData.lessionNumber} Lessons</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
