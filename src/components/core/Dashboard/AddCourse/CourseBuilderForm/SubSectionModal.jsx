import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { PiXBold } from "react-icons/pi";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
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
  const [loading, setLoading] = useState(false);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }
    return false;
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();

    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    // api call
    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the sub-section");
      } else {
        handleEditSubSection();
      }
      return;
    }

    // Create new subsection
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    // api call
    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="my-10 w-11/12 max-w-[42rem] rounded-lg border border-richblack-400 bg-richblack-800">
          <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 px-5 py-4">
            <p className="text-xl font-semibold text-richblack-5">
              {view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture
            </p>
            <button onClick={() => (!loading ? setModalData(null) : {})}>
              <PiXBold className="text-xl text-richblack-5 font-bold" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 px-8 py-10"
          >
            <Upload
              name={"lectureVideo"}
              label={"Lecture Video"}
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="lectureTitle" className="lable-style">
                Title <sup className="text-pink-400">*</sup>
              </label>
              <input
                disabled={view}
                name="lectureTitle"
                id="lectureTitle"
                placeholder="Enter lecuture title"
                className="form-style"
                {...register("lectureTitle", { required: true })}
              />
              {errors.lectureTitle && (
                <span className="-mt-1 text-xs text-pink-400">
                  Lecture title is required
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lectureDesc" className="lable-style">
                Lecture Description <sup className="text-pink-400">*</sup>
              </label>
              <textarea
                disabled={view}
                name="lectureDesc"
                id="lectureDesc"
                placeholder="Enter lecuture description"
                className="form-style"
                rows={4}
                {...register("lectureDesc", { required: true })}
              />
              {errors.lectureDesc && (
                <span className="-mt-1 text-xs text-pink-400">
                  Lecture description is required
                </span>
              )}
            </div>

            {!view && (
              <div className="flex justify-end">
                <IconBtn
                  disabled={loading}
                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SubSectionModal;
