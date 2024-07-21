import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  //   const { token } = useSelector((state) => state.auth);
  //   const { user } = useSelector((state) => state.profile);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleBuyCourses = () => {
    const courses = cart.map((course) => course._id);
    console.log("Courses -> ", courses);
    // buyCourse(token, courses, user, navigate, dispatch);
  };
  return (
    <div className="min-w-[17.5rem] rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>
      <IconBtn
        text={"Buy Now"}
        onclick={handleBuyCourses}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
