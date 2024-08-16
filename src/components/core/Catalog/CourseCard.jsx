import { useEffect, useState } from "react";
import { GetAverageRating } from "../../../utils/getAverageRating";
import { Link } from "react-router-dom";
import RatingStar from "../../common/RatingStar";

function CourseCard({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAverageRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <>
      <Link to={`/course/${course._id}`}>
        <div>
          <img
            src={course?.thumbnail}
            alt="Course-image"
            className={`${Height} w-full rounded-xl object-cover`}
          />

          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex gap-2 items-center">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStar reviewCount={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length}
              </span>
            </div>
            <p className="text-lg text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CourseCard;
