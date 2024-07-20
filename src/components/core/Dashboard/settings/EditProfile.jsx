import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    // console.log("Form data --> ", data);

    try {
      dispatch(updateProfile(user, token, data));
    } catch (error) {
      console.log("PROFILE FORM SUBMITION ERROR --> ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      {/* Profile Information */}
      <div className="flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="lable-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-style"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your first name
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="lable-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-style"
              placeholder="Enter last name"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your last name
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="lable-style">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="form-style"
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your date of birth",
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="-mt-1 text-xs text-yellow-100">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender" className="lable-style">
              First Name
            </label>
            <select
              name="gender"
              id="gender"
              className="form-style h-full"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((ele, i) => (
                <option key={i} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please select your gender
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="email" className="lable-style">
              Email
            </label>
            <input
              disabled
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="form-style"
              // for verification purpose
              // {...register("email", { required: true })}
              defaultValue={user?.email}
            />
            {/* {errors.email && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your email
              </span>
            )} */}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="lable-style">
              Phone Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter contact number"
              className="form-style"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your contact number",
                },
                maxLength: { value: 12, message: "Invalid contact nubmer" },
                minLength: { value: 10, message: "Invalid contact nubmer" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="-mt-1 text-xs text-yellow-100">
                {errors.contactNumber.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="about" className="lable-style">
            About
          </label>
          <textarea
            rows={2}
            type="text"
            name="about"
            id="about"
            placeholder="Enter your bio"
            className="form-style"
            {...register("about", { required: true })}
            defaultValue={user?.additionalDetails?.about}
          />
          {errors.about && (
            <span className="-mt-1 text-xs text-yellow-100">
              Please enter your bio
            </span>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text={"Save"} />
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
