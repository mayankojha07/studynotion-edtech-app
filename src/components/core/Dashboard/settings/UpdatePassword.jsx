import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { changePassword } from "../../../../services/operations/SettingsAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";

const UpdatePassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const submitPasswordForm = (data) => {
    console.log("Password data --> ", data);
    try {
      dispatch(
        changePassword(token, { ...data, confirmPassword: data.newPassword })
      );
    } catch (error) {
      console.log("Submit Password Form Error --> ", error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12 ">
        <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

        <div className="flex flex-col gap-5 justify-between lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="lable-style">
              Current Passowrd
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              className="form-style"
              placeholder="Enter current password"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[2.375rem] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}{" "}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your current password
              </span>
            )}
          </div>

          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="lable-style">
              New Passowrd
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              className="form-style"
              placeholder="Enter new password"
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[2.375rem] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}{" "}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-xs text-yellow-100">
                Please enter your new password
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
