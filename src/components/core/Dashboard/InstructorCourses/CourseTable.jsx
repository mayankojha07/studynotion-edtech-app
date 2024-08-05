import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { formatDate } from "../../../../services/formateDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function CourseTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // TODO: get the time duration of the course
  // const calculateDuration = (course) => {
  //   if (course.courseContent.length === 0) return 0;

  //   let totalSeconds = 0;

  //   course.courseContent.map((section) => {
  //     section.subSection?.map((subSection) => {
  //       let time = parseFloat(subSection.timeDuration);
  //       if (!isNaN(time)) {
  //         totalSeconds += time;
  //       }
  //     });
  //   });

  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   return `${hours}h ${minutes}min`;
  // };

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    // const result = await fetchInstructorCourses(token);
    const result = courses.filter((course) => course._id !== courseId);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  const TRUNCATE_LENGTH = 30;

  return (
    <>
      <div className="px-8 pb-6">
        <Table className="rounded-xl border border-richblack-800">
          <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
              <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Course
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Duration
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Price
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                  No Courses Found
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-b-richblack-800 px-6 py-2"
                >
                  <Td className="flex flex-1 gap-x-4 text-richblack-5">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="rounded-lg object-cover h-[9.25rem] w-[13.75rem] aspect-[16/9]"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold text-richblack-5">
                        {course?.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                        {course?.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course?.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course?.courseDescription}
                      </p>
                      <p className="text-xs text-white">
                        Created: {formatDate(course?.createdAt)}
                      </p>

                      {course?.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex flex-row gap-2 items-center w-fit rounded-full bg-richblack-700 px-2 py-[2px] text-xs font-medium text-pink-100">
                          <HiClock size={14} /> Drafted
                        </p>
                      ) : (
                        <p className="flex flex-row items-center w-fit gap-2 rounded-full bg-richblack-700 font-medium text-yellow-100 px-2 py-[2px] text-xs">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </div>
                          Published
                        </p>
                      )}
                    </div>
                  </Td>

                  <Td className="text-sm font-medium text-richblack-5">
                    2h 30min
                  </Td>

                  <Td className="text-sm font-medium text-richblack-5">
                    ₹{course.price}
                  </Td>

                  <Td className="text-sm font-medium text-richblack-5">
                    <button
                      disabled={loading}
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    <button
                      disabled={loading}
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted.",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
}

export default CourseTable;
