import React from "react";

function CourseUploadTips() {
  return (
    <>
      <div className="w-full lg:w-[23rem] p-6 rounded-lg border border-richblack-700 bg-richblack-800 flex flex-col gap-5">
        <div className="text-lg font-semibold text-left text-richblack-5">
          ⚡Course Upload Tips
        </div>

        <ul className="flex flex-col gap-2 font-medium text-xs leading-5 text-richblack-5 list-disc ml-5">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important.</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </>
  );
}

export default CourseUploadTips;
