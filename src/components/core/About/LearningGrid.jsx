import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

function LearningGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 w-[21.875rem] xl:w-fit mx-auto py-12 my-12">
      {LearningGridArray.map((card, i) => (
        <div
          key={i}
          className={`${i == 0 && "xl:col-span-2 xl:h-[18.375rem]"} ${
            card.order % 2 === 1
              ? "bg-richblack-700 h-[18.375rem]"
              : card.order % 2 === 0
              ? "bg-richblack-800 h-[18.375rem]"
              : "bg-transparent"
          }  ${card.order === 3 && "xl:col-start-2"}`}
        >
          {card.order < 0 ? (
            <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
              <div className="text-richblack-5 text-4xl font-semibold">
                {card.heading} <HighlightText text={card.highlightText} />
              </div>
              <p className="text-richblack-300 font-medium">
                {card.description}
              </p>
              <div className="w-fit mt-2">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="p-8 flex flex-col gap-8">
              <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

              <p className="text-richblack-300 font-medium">
                {card.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LearningGrid;