import React, { useEffect, useState } from "react";
import OutletPath from "./OutletPath";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import EnrolledCourseCard from "./EnrolledCourseCard";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log("User enrolled courses -> ", response);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("enroll courses error --> ", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white w-full">
      <OutletPath outletName={"Enrolled Courses"} />

      <div className="mx-auto px-8 flex flex-col gap-10">
        {/* filter courses --> All, Pending, Completed */}
        {/* <div></div> */}

        <div className="my-8 text-richblack-5">
          {!enrolledCourses ? (
            <Spinner />
          ) : (
            <>
              {/* Headings */}
              <div className="flex rounded-t-lg bg-richblack-500">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Duration</p>
                <p className="flex-1 px-2 py-3">Progress</p>
              </div>

              {/* Courses Name */}
              {!enrolledCourses.length ? (
                <div className="grid h-[10vh] w-full place-content-center text-richblack-5">
                  You have not enrolled in any course yet.
                </div>
              ) : (
                enrolledCourses.map((course, index, courses) => (
                  <EnrolledCourseCard
                    key={index}
                    course={course}
                    courses={courses}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses;
