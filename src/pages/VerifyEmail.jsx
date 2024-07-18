import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { sendOtp, signUp } from "../services/operations/authAPI";

function VerifyEmail() {
  const { loading, signupData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accoutType,
      firstName,
      lastName,
      passowrd,
      confirmPassword,
      email,
    } = signupData;

    dispatch(
      signUp(
        accoutType,
        firstName,
        lastName,
        email,
        passowrd,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="w-full h-[calc(100vh-3.6rem)] flex justify-center items-center bg-richblack-900">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="flex flex-col justify-between gap-9 w-[100%] max-w-[508px] p-8 rounded-md">
          <div className="flex flex-col justify-between gap-1">
            <h2 className="font-inter font-semibold text-[30px] leading-9 text-richblack-5">
              Verify email
            </h2>

            <p className="font-inter font-normal text-[16px] leading-6 text-richblack-100">
              A verification code has been sent to you. Enter the code below
            </p>
          </div>

          <form
            className="flex flex-col justify-between gap-[20px]"
            onSubmit={handleOnSubmit}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-12 lg:w-16 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-1 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              type="submit"
              className="mt-3 rounded-lg p-3 bg-yellow-50 text-center shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset] hover:scale-95 transition-all duration-200 text-richblack-900 text-[16px] font-medium leading-6"
            >
              Verify Email
            </button>
          </form>

          <div className="rounded-lg p-3 text-richblack-50 text-[16px] font-medium leading-6 flex justify-between gap-4 items-center -mt-9 cursor-pointer">
            <Link
              to={"/login"}
              className="flex items-center justify-start gap-1"
            >
              <MdOutlineKeyboardBackspace /> <span>Back to Login</span>
            </Link>

            <div
              className="text-blue-100 text-[16px] leadind-6 flex items-center gap-1 justify-center"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <GiAnticlockwiseRotation /> <span>Resend it</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
