import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";
import OutletPath from "./OutletPath";
import IconBtn from "../../common/IconBtn";
import { FaPlus } from "react-icons/fa6";
import CourseTable from "./InstructorCourses/CourseTable";

function MyCourse() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between items-center pr-8">
          <OutletPath outletName={"My Courses"} />
          <IconBtn
            text={"Add Course"}
            customClasses="w-[16rem] lg:w-[12rem] flex-row-reverse"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <FaPlus className="text-lg" />
          </IconBtn>
        </div>

        {/* rendering the table of courses here */}
        {courses && <CourseTable courses={courses} setCourses={setCourses} />}
      </div>
    </>
  );
}

export default MyCourse;
