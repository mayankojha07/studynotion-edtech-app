import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex justify-center items-center bg-richblack-900">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="flex flex-col justify-between gap-9 w-[100%] max-w-[508px] p-8 rounded-md translate-y-[25%]">
          <div className="flex flex-col justify-between gap-3">
            <h2 className="font-inter font-semibold text-[30px] leading-9 text-richblack-5">
              {!emailSent ? "Reset Your Password" : "Check Email"}
            </h2>

            <p className="font-inter font-normal text-[16px] leading-6 text-richblack-100">
              {!emailSent
                ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`}
            </p>
          </div>

          <form
            className="flex flex-col justify-between gap-[20px]"
            onSubmit={handleOnSubmit}
          >
            {!emailSent && (
              <label className="flex flex-col justify-between gap-2">
                <p className="font-inter font-normal text-[14px] text-richblack-25 leading-5">
                  Email address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-richblack-800 rounded-lg p-3 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] text-richblack-5 leading-6 text-[16px] font-medium outline-none"
                />
              </label>
            )}

            <button
              type="submit"
              className="rounded-lg p-3 bg-yellow-50 text-center shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset] hover:scale-95 transition-all duration-200 text-richblack-900 text-[16px] font-medium leading-6"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
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

export default ForgotPassword;
