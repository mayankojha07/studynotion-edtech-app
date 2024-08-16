import toast from "react-hot-toast";
import { catalogData } from "../apis";
import { apiConnector } from "../apiConnector";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    );
    console.log("CATALOG PAGE DATA API RESPONSE -> ", response);

    if (!response?.data?.success) {
      throw new Error("Could not fetch catagory page data");
    }
    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR -> ", error);
    result = error.response?.data;
    toast.error("Could not fetch catalog page data");
  }
  toast.dismiss(toastId);
  return result;
};
