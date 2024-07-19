import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import StrongPasswordSuggestion from "../components/core/Auth/StrongPasswordSuggestion";
import toast from "react-hot-toast";
import { resetPassword } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

function UpdatePassword() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordSuggestions = [
    "one lowercase character",
    "one special character",
    "one uppercase character",
    "8 minimum characters",
    "one number",
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and confirm passwrod don't match");
      return;
    }
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(formData.password, formData.confirmPassword, token));
  };

  return (
    <div className="w-full h-[calc(100vh-3.6rem)] flex justify-center items-center bg-richblack-900">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-between gap-9 w-[100%] max-w-[508px] p-8 rounded-md">
          <div className="flex flex-col justify-between gap-3">
            <h2 className="font-inter font-semibold text-[30px] leading-9 text-richblack-5">
              Enter New Password
            </h2>

            <p className="font-inter font-normal text-[16px] leading-6 text-richblack-100">
              Almost done. Enter your new password and youre all set.
            </p>
          </div>

          <form
            className="flex flex-col justify-between gap-[20px]"
            onSubmit={handleOnSubmit}
          >
            <label className="relative">
              <p className="font-inter font-normal text-[14px] text-richblack-25 leading-5 mb-1">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleOnChange}
                className="w-full bg-richblack-800 rounded-lg p-3 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] text-richblack-5 leading-6 text-[16px] font-medium outline-none"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[35px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative">
              <p className="font-inter font-normal text-[14px] text-richblack-25 leading-5 mb-1">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Enter confirm password"
                onChange={handleOnChange}
                className="w-full bg-richblack-800 rounded-lg p-3 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] text-richblack-5 leading-6 text-[16px] font-medium outline-none"
              />

              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[35px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <div className="flex flex-row flex-wrap justify-start items-center gap-2 w-full">
              {passwordSuggestions.map((el, index) => (
                <StrongPasswordSuggestion key={index} text={el} />
              ))}
            </div>

            <button
              type="submit"
              className="mt-3 rounded-lg p-3 bg-yellow-50 text-center shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset] hover:scale-95 transition-all duration-200 text-richblack-900 text-[16px] font-medium leading-6"
            >
              Reset Password
            </button>
          </form>

          <Link to={"/login"}>
            <div className="rounded-lg p-3 text-richblack-50 text-[16px] font-medium leading-6 flex justify-start gap-1 items-center -mt-9 cursor-pointer">
              <MdOutlineKeyboardBackspace /> <span>Back to Login</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
