import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATE PROFILE PICTURE API RESPONSE --> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Profile picutre uploaded.");
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(user, token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("UPDATE PROFILE RESPONSE --> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(
        setUser({
          ...user,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          additionalDetails: response.data.profileDetails,
        })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          additionalDetails: response.data.profileDetails,
        })
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export function changePassword(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        { Authorization: `Bearer ${token}` }
      );

      console.log("CHANGE PASSWORD API RESPONSE --> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Passowrd Changed Successfully");
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("DELETE PROFILE API RESPONSE --> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }

    toast.dismiss(toastId);
  };
}
