import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

function Slidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="max-w-[222px] h-[calc(100vh-3.5rem)] flex flex-col border-r border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {/* Sidebar links for pages */}
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        {/* horizontal line */}
        <div className="h-[1px] w-10/12 bg-richblack-600 my-6 mx-auto" />

        {/* settings tab  */}
        <div className="flex flex-col">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />

          {/* Logout option -> opens confirmation modal */}
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-white flex items-center gap-x-2 px-8 py-2"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default Slidebar;
