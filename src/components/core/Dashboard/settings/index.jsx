import OutletPath from "../OutletPath";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <div className="w-full">
      <OutletPath outletName={"Settings"} />

      <div className="mx-auto w-11/12 max-w-[62.5rem] py-8 flex flex-col gap-10">
        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Edit Profile */}
        <EditProfile />

        {/* Update Password */}
        <UpdatePassword />

        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
