import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course?.courseName),
    datasets: [
      {
        data: courses.map((course) => course?.totalStudentEnrolled),
        backgroundColor: generateRandomColors(courses?.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course?.courseName),
    datasets: [
      {
        data: courses.map((course) => course?.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses?.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-80 w-80">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Chart, registerables } from "chart.js";
// import { Pie } from "react-chartjs-2";

// Chart.register(...registerables);

// export default function InstructorChart({ courses }) {
//   // State to keep track of the currently selected chart
//   const [currChart, setCurrChart] = useState("students");

//   // Function to generate random colors for the chart
//   const generateRandomColors = (numColors) => {
//     const colors = [];
//     for (let i = 0; i < numColors; i++) {
//       const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//         Math.random() * 256
//       )}, ${Math.floor(Math.random() * 256)})`;
//       colors.push(color);
//     }
//     return colors;
//   };

//   // Data for the chart displaying student information
//   const chartDataStudents = {
//     labels: courses.map((course) => course?.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course?.totalStudentEnrolled),
//         backgroundColor: generateRandomColors(courses?.length),
//       },
//     ],
//   };

//   // Data for the chart displaying income information
//   const chartIncomeData = {
//     labels: courses.map((course) => course?.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course?.totalAmountGenerated),
//         backgroundColor: generateRandomColors(courses?.length),
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     maintainAspectRatio: true,
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 20,
//           padding: 10,
//         },
//       },
//     },
//   };

//   return (
//     <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
//       <p className="text-lg font-bold text-richblack-5">Visualize</p>
//       <div className="space-x-4 font-semibold">
//         {/* Button to switch to the "students" chart */}
//         <button
//           onClick={() => setCurrChart("students")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "students"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Students
//         </button>
//         {/* Button to switch to the "income" chart */}
//         <button
//           onClick={() => setCurrChart("income")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "income"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Income
//         </button>
//       </div>
//       <div className="relative mx-auto aspect-square h-64 w-64">
//         {/* Render the Pie chart based on the selected chart */}
//         <Pie
//           data={currChart === "students" ? chartDataStudents : chartIncomeData}
//           options={options}
//         />
//       </div>
//     </div>
//   );
// }

//
// import { useState } from "react";
// import { Chart, registerables } from "chart.js";
// import { Pie } from "react-chartjs-2";

// Chart.register(...registerables);

// export default function InstructorChart({ courses }) {
//   // State to keep track of the currently selected chart
//   const [currChart, setCurrChart] = useState("students");

//   // Function to generate random colors for the chart
//   const generateRandomColors = (numColors) => {
//     const colors = [];
//     for (let i = 0; i < numColors; i++) {
//       const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//         Math.random() * 256
//       )}, ${Math.floor(Math.random() * 256)})`;
//       colors.push(color);
//     }
//     return colors;
//   };

//   // Data for the chart displaying student information
//   const chartDataStudents = {
//     labels: courses.map((course) => course?.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course?.totalStudentEnrolled),
//         backgroundColor: generateRandomColors(courses?.length),
//       },
//     ],
//   };

//   // Data for the chart displaying income information
//   const chartIncomeData = {
//     labels: courses.map((course) => course?.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course?.totalAmountGenerated),
//         backgroundColor: generateRandomColors(courses?.length),
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 15,
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
//       <p className="text-lg font-bold text-richblack-5">Visualize</p>
//       <div className="space-x-4 font-semibold">
//         {/* Button to switch to the "students" chart */}
//         <button
//           onClick={() => setCurrChart("students")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "students"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Students
//         </button>
//         {/* Button to switch to the "income" chart */}
//         <button
//           onClick={() => setCurrChart("income")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "income"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Income
//         </button>
//       </div>
//       <div className="relative mx-auto aspect-square h-96 w-96">
//         {/* Render the Pie chart based on the selected chart */}
//         <Pie
//           data={currChart === "students" ? chartDataStudents : chartIncomeData}
//           options={options}
//         />
//       </div>
//     </div>
//   );
// }

//
// import { useState } from "react";
// import { Chart, registerables } from "chart.js";
// import { Pie } from "react-chartjs-2";

// Chart.register(...registerables);

// export default function InstructorChart({ courses }) {
//   // State to keep track of the currently selected chart
//   const [currChart, setCurrChart] = useState("students");

//   // Function to generate random colors for the chart
//   const generateRandomColors = (numColors) => {
//     const colors = [];
//     for (let i = 0; i < numColors; i++) {
//       const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//         Math.random() * 256
//       )}, ${Math.floor(Math.random() * 256)})`;
//       colors.push(color);
//     }
//     return colors;
//   };

//   // Data for the chart displaying student information
//   const chartDataStudents = {
//     labels: courses.map((course) => course?.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course?.totalStudentEnrolled),
//         backgroundColor: generateRandomColors(courses?.length),
//       },
//     ],
//   };

//   // Data for the chart displaying income information
//   const chartIncomeData = {
//     labels: courses.map((course) => course?.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course?.totalAmountGenerated),
//         backgroundColor: generateRandomColors(courses?.length),
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 10, // Adjusted box width to save space
//           padding: 8, // Added padding for better spacing
//           font: {
//             size: 12, // Adjusted font size for better fit
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
//       <p className="text-lg font-bold text-richblack-5">Visualize</p>
//       <div className="space-x-4 font-semibold">
//         {/* Button to switch to the "students" chart */}
//         <button
//           onClick={() => setCurrChart("students")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "students"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Students
//         </button>
//         {/* Button to switch to the "income" chart */}
//         <button
//           onClick={() => setCurrChart("income")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "income"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Income
//         </button>
//       </div>
//       <div className="relative mx-auto aspect-square h-96 w-96">
//         {/* Render the Pie chart based on the selected chart */}
//         <Pie
//           data={currChart === "students" ? chartDataStudents : chartIncomeData}
//           options={options}
//         />
//       </div>
//       {/* Scrollable legend wrapper */}
//       <div className="mt-4 max-h-32 overflow-y-auto text-center">
//         <p className="text-sm text-gray-400">Legend</p>
//         {currChart === "students"
//           ? chartDataStudents.labels.map((label, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-start gap-2"
//               >
//                 <div
//                   className="h-4 w-4"
//                   style={{
//                     backgroundColor:
//                       chartDataStudents.datasets[0].backgroundColor[index],
//                   }}
//                 ></div>
//                 <p className="text-sm text-gray-200">{label}</p>
//               </div>
//             ))
//           : chartIncomeData.labels.map((label, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-start gap-2"
//               >
//                 <div
//                   className="h-4 w-4"
//                   style={{
//                     backgroundColor:
//                       chartIncomeData.datasets[0].backgroundColor[index],
//                   }}
//                 ></div>
//                 <p className="text-sm text-gray-200">{label}</p>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }
