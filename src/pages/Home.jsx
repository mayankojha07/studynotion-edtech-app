import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";
import Footer from "../components/common/Footer";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSection from "../components/core/HomePage/ReviewSection";

function Home() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* Section 1 */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-[38px] text-white items-center justify-between">
        <div className="max-w-[913px] flex flex-col gap-[38px] justify-between items-center mt-16">
          <Link to={"/signup"}>
            <div className="group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]">
              <div className="flex flex-row items-center gap-[10px] rounded-full px-[18px] py-[6px] transition-all duration-200 group-hover:bg-richblack-900">
                <p className="font-inter font-[500] leading-6 text-center text-[16px]">
                  Become an Instructor
                </p>
                <FaArrowRightLong />
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-[16px]">
            <div className="font-inter text-center text-4xl leading-[44px] font-semibold text-[#f1f2ff] tracking-[-0.02em]">
              Empower Your Future with <HighlightText text={"Coding Skills"} />
            </div>

            <div className="font-inter text-[16px] font-medium leading-6 text-center text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </div>
          </div>

          <div className="flex flex-row items-center gap-6">
            <CTAButton active={true} linkto={"/signup"}>
              Learn more
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Book a demo
            </CTAButton>
          </div>
        </div>

        {/* Video  */}

        <div className="relative w-full max-w-[1035px] mx-auto shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_0px_0px_#F5F5F5] w-full "
          >
            <source src={Banner}></source>
          </video>
        </div>

        {/* CodeBlocks  */}
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your <HighlightText text={"Coding Potential"} /> with our
              online course
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>\n`}
          codeColor={"text-yellow-25"}
        />

        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your <HighlightText text={"Coding Potential"} /> with our
              online course
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>\n`}
          codeColor={"text-yellow-25"}
        />
      </div>

      {/* Explore more section */}
      <ExploreMore />

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 -mt-60">
        <div className="homepage_bg h-[320px] w-full"></div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between px-[2rem] py-[3rem] gap-[52px]">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-3">
            <div className="w-[45%] text-4xl leading-[44px] font-inter font-semibold tracking-[-0.02em]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col items-start justify-between gap-5 w-[45%]">
              <div className="text-[16px] font-medium leading-6">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={""}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>

        <TimelineSection />

        <LearningLanguageSection />
      </div>

      {/* Section 3 */}
      <div className="w-full">
        <InstructorSection />

        <ReviewSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
