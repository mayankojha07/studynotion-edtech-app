import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import {
  setStep,
  setEditCourse,
  setCourse,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  updateSection,
  createSection,
} from "../../../../../services/operations/courseDetailsAPI";

function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  const goToBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture to each section");
      return;
    }
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      handleCancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    console.log("Edit section name --> ", editSectionName);
    if (editSectionName) {
      // We are editing and have to update the course
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      dispatch(setEditCourse(false));
      setValue("sectionName", "");
      setEditSectionName(null);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="space-y-8 border border-richblack-700 bg-richblack-800 p-6 rounded-md">
        <p className="text-richblack-5 font-semibold text-2xl">
          Course Builder
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="sectionName" className="lable-style">
              Section Name <sup className="text-pink-400">*</sup>
            </label>
            <input
              id="sectionName"
              name="sectionName"
              disabled={loading}
              placeholder="Enter section name"
              {...register("sectionName", { required: true })}
              className="form-style"
            />
            {errors.sectionName && (
              <span className="-mt-1 text-pink-400 text-xs">
                Section name is required
              </span>
            )}
          </div>

          <div className="flex items-end gap-x-4">
            <IconBtn
              type={"submit"}
              disabled={loading}
              text={editSectionName ? "Edit Section Name" : "Create Section"}
              outline={true}
              customClasses="text-yellow-50 flex-row-reverse hover:text-richblack-900 hover:bg-yellow-50 transition-color duration-200"
            >
              <IoMdAddCircleOutline className="font-extrabold text-xl" />
            </IconBtn>
            {editSectionName && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-base text-richblack-300 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Nexted view for creating secitons and subsections */}
        {course.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )}

        {/* Back and Next buttons */}
        <div className="flex justify-end items-center gap-x-3">
          <button
            onClick={goToBack}
            className="flex items-center gap-x-2 cursor-pointer px-4 font-semibold py-2 text-richblack-900 bg-richblack-300 border border-richblack-700 rounded-md"
          >
            <MdNavigateBefore />
            <span>Back</span>
          </button>
          <IconBtn disabled={loading} text={"Next"} onclick={goToNext}>
            <MdNavigateNext />
          </IconBtn>
        </div>
      </div>
    </>
  );
}

export default CourseBuilderForm;
