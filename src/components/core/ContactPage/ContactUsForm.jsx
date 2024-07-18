import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiConnector";
import { endpoints } from "../../../services/apis";

function ContactUsForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    setLoading(true);
    try {
      const resposne = await apiConnector(
        "POST",
        endpoints.CONTACT_US_API,
        data
      );
      console.log(data);
      console.log("RESPONSE --> ", resposne);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="form-style"
            placeholder="Enter first name"
            {...register("firstname", { required: true })}
          />

          {errors.firstname && (
            <span className="-mt-1 text-xs text-yellow-100">
              Please enter your firstname
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="form-style"
            placeholder="Enter last name"
            {...register("lastname", { required: true })}
          />

          {errors.lastname && (
            <span className="-mt-1 text-xs text-yellow-100">
              Please enter your lastname
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-style"
          placeholder="Enter email address"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-xs text-yellow-100">
            Please enter your email
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNo" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex flex-col w-[81px] gap-2 justify-center">
            <select
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} -{ele.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="text"
              id="phonenumber"
              name="phoneNo"
              className="form-style"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your phone number",
                },
                minLength: {
                  value: 10,
                  message: "Invalid phone number",
                },
                maxLength: {
                  value: 10,
                  message: "Invalid phone number",
                },
              })}
            />
          </div>
        </div>

        {errors.phoneNo && (
          <span className="-mt-1 text-xs text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          cols={30}
          rows={7}
          className="form-style"
          placeholder="Enter your message here"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-xs text-yellow-100">
            Please enter your message
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
        } disabled:bg-richblack-500 sm:text-base`}
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactUsForm;
