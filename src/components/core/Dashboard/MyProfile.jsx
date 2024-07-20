import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FiEdit } from "react-icons/fi";
import OutletPath from "./OutletPath";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-white w-full">
      <OutletPath outletName={"My Profile"} />

      <div className="mx-auto w-11/12 max-w-[62.5rem] py-8 flex flex-col gap-10">
        {/* Section 1 */}
        <div className="w-full flex flex-row justify-between items-center gap-5 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex items-center gap-x-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[4.875rem] object-cover rounded-full"
            />

            <div className="space-y-1">
              <p className="text-lg font-semibold text-richblack-5 tracking-wide">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">{user?.email}</p>
            </div>
          </div>
          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")}>
            <FiEdit className="text-sm" />
          </IconBtn>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-y-2 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="w-full flex items-center justify-between gap-x-5">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <FiEdit className="text-sm" />
            </IconBtn>
          </div>

          <p
            className={`text-sm font-medium ${
              user?.additionalDetails?.about
                ? "text-richblack-5"
                : "text-richblack-400"
            }`}
          >
            {user?.additionalDetails?.about !== ""
              ? user?.additionalDetails?.about
              : "Write Something About Yourself"}
          </p>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-y-3 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="w-full flex justify-between items-center gap-x-5">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <FiEdit className="text-sm" />
            </IconBtn>
          </div>

          <div className="flex flex-col justify-between gap-y-2">
            <div className="flex gap-x-5 justify-between items-center">
              <div className="w-[50%] gap-y-2">
                <p className="text-sm text-richblack-600">First Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.firstName}
                </p>
              </div>
              <div className="w-[50%] gap-y-2">
                <p className="text-sm text-richblack-600">Last Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.lastName}
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 justify-between items-center">
              <div className="w-[50%] gap-y-2">
                <p className="text-sm text-richblack-600">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.email}
                </p>
              </div>
              <div className="w-[50%] gap-y-2">
                <p className="text-sm text-richblack-600">Phone Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.contactNumber !== ""
                    ? user?.additionalDetails?.contactNumber
                    : "Add Contact Number"}
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 justify-between items-center">
              <div className="w-[50%] gap-y-2">
                <p className="text-sm text-richblack-600">Gender</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.gender !== ""
                    ? user?.additionalDetails?.gender
                    : "Add Gender"}
                </p>
              </div>
              <div className="w-[50%] gap-y-2">
                <p className="text-sm text-richblack-600">Date of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.dateOfBirth !== ""
                    ? user?.additionalDetails?.dateOfBirth
                    : "Add Date of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
