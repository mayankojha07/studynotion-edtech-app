import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

function PublishCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToBack = () => {
    dispatch(setStep(3));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    // navigate('/dashboard/my-courses')
  };

  const handleCoursePublish = async () => {
    // if course status is not changed
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    // if course status is changed
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          Publish Settings
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-6 mb-8">
            <label
              htmlFor="public"
              className="inline-flex items-center text-lg gap-x-2"
            >
              <input
                type="checkbox"
                id="public"
                className="w-4 h-4 border border-gray-300 bg-richblack-500 text-richblack-400 rounded focus:ring-2 focus:ring-richblack-700 outline-none focus:outline-none"
                {...register("public")}
              />
              <span className="text-richblack-400 ml-1">
                Make this course as public
              </span>
            </label>
          </div>

          <div className="ml-auto flex items-center gap-x-4 max-w-max">
            <button
              disabled={loading}
              type="button"
              onClick={goToBack}
              className="flex items-center gap-x-2 cursor-pointer px-4 font-semibold py-2 text-richblack-900 bg-richblack-300 border border-richblack-700 rounded-md"
            >
              <MdNavigateBefore className="text-xl" /> <span>Back</span>
            </button>
            <IconBtn disabled={loading} text={"Save Changes"}>
              <MdNavigateNext className="text-xl" />
            </IconBtn>
          </div>
        </form>
      </div>
    </>
  );
}

export default PublishCourse;
