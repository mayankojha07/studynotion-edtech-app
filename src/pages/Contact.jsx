import React from "react";

import Footer from "../components/common/Footer";
import ContactDetails from "../components/core/ContactPage/ContactDetails";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import ReviewSlider from "../components/core/HomePage/ReviewSection";

const Contact = () => {
  return (
    <>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row lg:px-12 lg:py-2">
        {/* Contact Details */}
        <div className="lg:w-[35%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%] rounded-lg p-5 lg:p-10 border border-richblack-600">
          <ContactUsForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <ReviewSlider />
      </div>
      <Footer />
    </>
  );
};

export default Contact;
