// import React from "react";
// import Logo from "../../assets/Logo/Logo-Full-Light.png";
// import { RiGoogleLine } from "react-icons/ri";
// import { PiFacebookLogoFill, PiTwitterLogoFill } from "react-icons/pi";
// import { FaYoutube } from "react-icons/fa";

// function Footer() {
//   return (
//     <div className="w-screen border-t border-richblack-600 px-[120px] py-[52px] flex flex-col justify-center items-center gap-[32px] bg-richblack-800">
//       <div className="w-full flex flex-row flex-wrap justify-between items-start gap-[52px]">
//         {/* first section */}
//         <div className="flex items-start justify-between w-[45%] gap-3">
//           {/* 1.1 section */}
//           <div className="flex flex-col gap-3 justify-start items-baseline">
//             <div className="max-w-[160px]">
//               <img src={Logo} className="w-full" />
//             </div>

//             <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//               Company
//             </div>

//             <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//               <p>About</p>
//               <p>Careers</p>
//               <p>Affiliates</p>
//             </div>

//             <div className="flex items-center justify-start gap-3">
//               <PiFacebookLogoFill className="text-[24px] text-richblack-400" />
//               <RiGoogleLine className="text-[21px] rounded-full bg-richblack-400" />
//               <PiTwitterLogoFill className="text-[24px] text-richblack-400" />
//               <FaYoutube className="text-[24px] text-richblack-400" />
//             </div>
//           </div>

//           {/* 1.2 section */}
//           <div className="flex flex-col justify-between items-baseline gap-9">
//             <div className="flex flex-col justify-between items-baseline gap-3">
//               <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//                 Resources
//               </div>

//               <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//                 <p>Articles</p>
//                 <p>Blog</p>
//                 <p>Chart Sheet </p>
//                 <p>Code Challenges</p>
//                 <p>Docs</p>
//                 <p>Projects</p>
//                 <p>Videos</p>
//                 <p>Workspaces</p>
//               </div>
//             </div>

//             <div className="flex flex-col justify-between items-baseline gap-3">
//               <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//                 Support
//               </div>
//               <div className="text-[14px] font-normal leading-[22px] text-richblack-400">
//                 Help Center
//               </div>
//             </div>
//           </div>

//           {/* 1.3 section */}
//           <div className="flex flex-col justify-between items-baseline gap-9">
//             <div className="flex flex-col justify-between items-baseline gap-3">
//               <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//                 Plans
//               </div>
//               <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//                 <p>Paid memeberships</p>
//                 <p>For students</p>
//                 <p>Business solutions</p>
//               </div>
//             </div>

//             <div className="flex flex-col justify-between items-baseline gap-3">
//               <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//                 Community
//               </div>
//               <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//                 <p>Forums</p>
//                 <p>Chapters</p>
//                 <p>Events</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block border-l border-richblack-600 w-1 sm:h-[500px]"></div>

//         {/* Second section */}
//         <div className="flex items-start justify-between w-[45%] gap-3">
//           {/* 2.1 section */}
//           <div className="flex flex-col justify-between items-baseline gap-3">
//             <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//               Subjects
//             </div>

//             <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//               <p>AI</p>
//               <p>Cloud Computing</p>
//               <p>Code Foundation</p>
//               <p>Computer Science</p>
//               <p>Cyber Security</p>
//               <p>Data Analytics </p>
//               <p>Data Science</p>
//               <p>Data Visualisation</p>
//               <p>Developer Tools </p>
//               <p>DevOps</p>
//               <p>Game Development</p>
//               <p>IT</p>
//               <p>Machine Learning</p>
//               <p>Math</p>
//               <p>Mobile Development</p>
//               <p>Web Design</p>
//               <p>Web Development</p>
//             </div>
//           </div>

//           {/* 2.2 section */}
//           <div className="flex flex-col justify-between items-baseline gap-3">
//             <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//               Languages
//             </div>

//             <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//               <p>Bash</p>
//               <p>C</p>
//               <p>C++</p>
//               <p>C#</p>
//               <p>Go</p>
//               <p>HTML & CSS </p>
//               <p>Java</p>
//               <p>JavaScript</p>
//               <p>Kotlin</p>
//               <p>PHP</p>
//               <p>Python</p>
//               <p>R</p>
//               <p>Ruby</p>
//               <p>SQL</p>
//               <p>Swift</p>
//             </div>
//           </div>

//           {/* 2.3 section */}
//           <div className="flex flex-col justify-between items-baseline gap-3">
//             <div className="font-inter font-semibold text-[16px] leading-6 text-richblack-100">
//               Career Buildings
//             </div>

//             <div className="flex flex-col gap-[8px] justify-start items-baseline text-[14px] font-normal leading-[22px] text-richblack-400">
//               <p>Career Paths</p>
//               <p>Career Sevices</p>
//               <p>Interview Prep</p>
//               <p>Professional Certification</p>
//               <p>-</p>
//               <p>Full Catalog</p>
//               <p>Beta Content</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main parts */}
//       <div className="w-full border-t border-richblack-600"></div>

//       {/* Main parts */}
//       <div className="font-inter text-[14px] font-medium leading-[22px] text-left text-richblack-300 flex items-center justify-between gap-3 w-full">
//         <div className="flex items-center justify-start gap-[8px]">
//           <p>Privacy Policy</p>
//           <p className="text-richblack-700 font-bold">|</p>
//           <p>Cookie Policy</p>
//           <p className="text-richblack-700 font-bold">|</p>
//           <p>Terms</p>
//         </div>

//         <p>
//           Made with <span className="text-[red] text-[16px] font-bold">♥</span>{" "}
//           CodeHelp © 2023 Studynotion
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Footer;

import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <img src={Logo} alt="" className="object-contain" />
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            Made with ❤️ CodeHelp © 2023 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
