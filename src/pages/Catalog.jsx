import React, { useEffect, useState } from "react";
import OutletPath from "../components/core/Dashboard/OutletPath";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Spinner from "../components/common/Spinner";
import Error from "./Error";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import CourseCard from "../components/core/Catalog/CourseCard";

function Catalog() {
  const { catalogName } = useParams();

  const { loading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all Categories
  useEffect(() => {
    const getCategories = async () => {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Category response -> ", result);
      const category_id = result?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      console.log("Category id -> ", category_id);
      setCategoryId(category_id);
    };

    getCategories();
  }, [catalogName]);

  // Fetch all category Details
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("PRINTING RES -> ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log("ERROR -> ", error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return <Spinner />;
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    // Hero Section
    <>
      {/* Course Title  */}
      <div className="box-content bg-richblack-800 pb-4 lg:pb-8">
        <div className="flex flex-col gap-2 max-w-maxContent mx-auto px-3 md:px-6 ">
          <OutletPath
            outletName={catalogPageData?.data?.selectedCategory?.name}
            pageName="Catalog"
            customClasses="px-0 lg:px-0 lg:pb-4"
          />
          <p className="max-w-[54rem] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContent px-3 md:px-6 py-12">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm ">
          <p
            className={`px-2 md:px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most popular
          </p>
          <p
            className={`px-2 md:px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="p-1">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto w-full max-w-maxContent box-content px-6 py-12">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8 w-full">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContent px-3 lg:px-6 py-12">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              ?.map((course, index) => (
                <CourseCard course={course} key={index} Height={"h-[25rem]"} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalog;
