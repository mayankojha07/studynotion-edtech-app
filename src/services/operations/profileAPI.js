import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
  GET_INSTRUCTOR_DATA_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_USER_DETAILS_API,
} = profileEndpoints;

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    console.log("GET UESR ENROLLED COURSES API RESPONSE --> ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    console.log("GET USER ENROLLED COURSES API ERROR --> ", error);
    toast.error("Could not get enrolled courses details");
  }

  toast.dismiss(toastId);
  return result;
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET USER DETAILS API RESPONSE --> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      //   localStorage.setItem("user", response.data.data);

      toast.success("User details fetched successfully");
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET USER DETAILS API ERROR --> ", error);
      toast.error("Could not get the use details");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET INSTRUCTOR DATA API RESPONSE --> ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.courses;
    toast.success("Instructor data fetched successfully");
  } catch (error) {
    console.log("GET INSTURCTOR DATA API ERROR --> ", error);
    toast.error("Could not get insturctor data");
  }

  toast.dismiss(toastId);
  return result;
}
