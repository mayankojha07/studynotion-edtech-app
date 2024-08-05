import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import OutletPath from "../OutletPath";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import Spinner from "../../../common/Spinner";

function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populatedCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        const updatedTags = JSON.parse(result.courseDetails.tag[0]);
        const updatedRequirementsList = JSON.parse(
          result.courseDetails.instructions[0]
        );
        const updatedCourse = {
          ...result.courseDetails,
          tag: updatedTags,
          instructions: updatedRequirementsList,
        };
        dispatch(setCourse(updatedCourse));
      }
      setLoading(false);
    };

    populatedCourseDetails();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <OutletPath outletName={"Edit Course"} />
        <div className="mx-auto max-w-[37.5rem]">
          {course ? (
            <RenderSteps />
          ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
              Course not found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default EditCourse;
