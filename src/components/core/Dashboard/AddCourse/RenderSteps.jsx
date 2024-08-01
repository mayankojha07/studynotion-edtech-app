import React, { Fragment } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm";
import PublishCourse from "./PublishCourse";

function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        {steps.map((item) => (
          <Fragment key={item.id}>
            <div>
              <div
                className={`${
                  step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : step > item.id
                    ? "bg-yellow-50 border-richblack-300"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } border w-10 aspect-square text-lg rounded-full flex justify-center items-center`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {item.id !== steps.length && (
              <div
                className={`w-full h-[1px] border-2 border-dashed ${
                  step > item.id ? "border-yellow-50" : "border-richblack-700"
                }`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="space-y-6">
        {/* Rendering the title of the form */}
        {steps.map((item) => (
          <Fragment key={item.id}>
            {step === item.id && (
              <div>
                <p className="text-richblack-5 font-medium text-xl">
                  {item.title}
                </p>
              </div>
            )}
          </Fragment>
        ))}

        {/* Rendering the corrosponding form with the title */}
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </>
  );
}

export default RenderSteps;
