import React from "react";
import CourseUploadTips from "./CourseUploadTips";
import OutletPath from "../OutletPath";
import RenderSteps from "./RenderSteps";

function AddCourse() {
  return (
    <>
      <div className=" w-full flex flex-col lg:flex-row items-center lg:items-start gap-x-8 px-8 pb-8 lg:pb-0">
        <div className="flex-1 w-full gap-6 ">
          <div className="-ml-8 -mb-8">
            <OutletPath outletName={"Add Course"} />
          </div>
          {/* Course Uploading Form Section */}
          <div className="w-full max-w-[40rem] mx-auto flex flex-col justify-center gap-6 py-10">
            <RenderSteps />
          </div>
        </div>
        {/* Course Uploading Tips Section */}
        <div className="lg:sticky lg:top-6  w-full max-w-[40rem] lg:max-w-[23rem]">
          <CourseUploadTips />
        </div>
      </div>
    </>
  );
}

export default AddCourse;
