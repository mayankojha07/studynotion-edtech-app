import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({ key, course, courses }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center border border-richblack-700 ${
        key === courses.length - 1 ? "rounded-b-lg" : "rounded-none"
      }`}
    >
      <div
        className="flex w-[45%] cursor-pointer items-center px-5 py-3 gap-4"
        onClick={() => {
          navigate(
            `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
          );
        }}
      >
        <img
          src={course.thumbnail}
          alt="course-img"
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-2 max-w-xs">
          <p className="font-semibold">{course.courseName}</p>
          <p className="text-xs text-richblack-300">
            {course.courseDescription.length > 50
              ? `${course.courseDescription.slice(0, 50)}...`
              : course.courseDescription}
          </p>
        </div>
      </div>
      <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
      <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
        <p>Progress: {course?.progressPercentage || 0}%</p>
        <ProgressBar
          completed={course?.progressPercentage || 0}
          height="0.5rem"
          isLabelVisible={false}
        />
      </div>
    </div>
  );
}

export default EnrolledCourseCard;
