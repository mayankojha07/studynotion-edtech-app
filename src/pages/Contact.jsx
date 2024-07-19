import React from "react";

import Footer from "../components/common/Footer";
import ContactDetails from "../components/core/ContactPage/ContactDetails";
import ReviewSlider from "../components/core/HomePage/ReviewSection";
import ContactForm from "../components/core/ContactPage/ContactForm";

const Contact = () => {
  return (
    <>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row lg:px-12 lg:py-2">
        {/* Contact Details */}
        <div className="lg:w-[35%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
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
