import { SwiperSlide, Swiper } from "swiper/react";
import CourseCard from "./CourseCard";
import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper";

function CourseSlider({ Courses }) {
  return (
    <>
      {Courses.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          navigation={true}
          modules={[FreeMode, Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className=""
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course} Height={"15.625rem"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
}

export default CourseSlider;
