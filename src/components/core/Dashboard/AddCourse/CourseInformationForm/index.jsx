import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipsInput from "./ChipsInput";
import Upload from "../Upload";
import RequirementField from "./RequirementField";
import { setStep, setCourse } from "../../../../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";

function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.couresDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.couresDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
      return true;
    else return false;
  };

  // handle on submit
  const onSubmit = async (data) => {
    // when editing an existing course
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName)
          formData.append("courseName", data.courseTitle);

        if (currentValues.coursePrice !== course.price)
          formData.append("price", data.coursePrice);

        if (currentValues.courseShortDesc !== course.couresDescription)
          formData.append("couresDescription", data.courseShortDesc);

        if (currentValues.courseTags.toString() !== course.tags.toString())
          formData.append("tags", JSON.stringify(data.courseTags));

        if (currentValues.courseBenefits !== course.whatYouWillLearn)
          formData.append("whatYouWillLearn", data.courseBenefits);

        if (currentValues.courseCategory !== course.category)
          formData.append("category", data.courseCategory);

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        )
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );

        if (currentValues.courseImage !== course.thumbnail)
          formData.append("thumbnail", data.courseImage);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // when creating a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("thumbnail", data.courseImage);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("instructions", JSON.stringify(data.courseRequirements));

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="courseTitle" className="lable-style">
            Course Title <sup className="text-pink-400">*</sup>
          </label>
          <input
            id="courseTitle"
            name="courseTitle"
            placeholder="Enter course title"
            className="form-style"
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <span className="-mt-1 text-xs text-pink-400">
              Course title is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="courseShortDesc" className="lable-style">
            Course Short Description <sup className="text-pink-400">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            name="courseShortDesc"
            placeholder="Enter course short description"
            className="form-style min-h-30"
            rows={4}
            {...register("courseShortDesc", { required: true })}
          />
          {errors.courseShortDesc && (
            <span className="-mt-1 text-xs text-pink-400">
              Course Description is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="coursePrice" className="lable-style">
            Course Price <sup className="text-pink-400">*</sup>
          </label>
          <input
            id="coursePrice"
            name="coursePrice"
            placeholder="Enter course price"
            className="form-style"
            style={{ paddingLeft: "2.3rem" }}
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />

          <span className="absolute left-2 top-1/2 text-2xl text-richblack-400">
            <HiOutlineCurrencyRupee />
          </span>

          {errors.coursePrice && (
            <span className="-mt-1 text-xs text-pink-400">
              Course price is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="courseCategory" className="lable-style">
            Course Category <sup className="text-pink-400">*</sup>
          </label>

          <select
            id="courseCategory"
            name="courseCategory"
            defaultValue={""}
            className="form-style h-12"
            {...register("courseCategory", { required: true })}
          >
            <option disabled value={""}>
              Choose a category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="-mt-1 text-xs text-pink-400">
              Course price is required
            </span>
          )}
        </div>

        {/* Custom component for creating tags */}
        <ChipsInput
          label={"Tags"}
          name={"courseTags"}
          placeholder={"Enter Tags and press Enter"}
          register={register}
          getValues={getValues}
          setValue={setValue}
          errors={errors}
        />

        {/* Create component for showing thumbnail */}
        <Upload
          name={"courseImage"}
          label={"Course Thumbnail"}
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="courseBenefits" className="lable-style">
            Benefits of the Courses <sup className="text-pink-400">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter course benefits"
            name="courseBenefits"
            {...register("courseBenefits", { required: true })}
            rows={4}
            className="form-style min-h-30"
          />
          {errors.courseBenefits && (
            <span className="-mt-1 text-xs text-pink-400">
              Benefits of course are required
            </span>
          )}
        </div>

        <RequirementField
          name={"courseRequirements"}
          label={"Requirements/Instructions"}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          placeholder={"Enter requirement here and click on add or press Enter"}
        />

        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              type="button"
              disabled={loading}
              onClick={() => dispatch(setStep(2))}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900`}
            >
              Continue without saving
            </button>
          )}
          <IconBtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </>
  );
}

export default CourseInformationForm;
