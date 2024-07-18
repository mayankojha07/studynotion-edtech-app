import React from "react";

function StatsComponent() {
  const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
  ];

  return (
    <div className="w-full bg-richblack-800">
      <div className="mx-auto w-11/12 max-w-maxContent flex justify-center items-center text-white py-8">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 justify-items-center text-center">
          {Stats.map((item, index) => (
            <div key={index} className="w-full flex flex-col py-10">
              <h2 className="text-[2rem] font-bold text-richblack-5">
                {item.count}
              </h2>
              <h3 className="font-semibold text-richblack-500 text-[1.25rem]">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsComponent;
