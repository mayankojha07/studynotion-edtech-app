import { useSelector } from "react-redux";
import OutletPath from "../OutletPath";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white w-full">
      <OutletPath outletName={"Wishlist"} />

      <div className="w-full p-8">
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
          {totalItems} Courses in Cart
        </p>

        {total > 0 ? (
          <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <RenderCartCourses />
            <RenderTotalAmount />
          </div>
        ) : (
          <p className="mt-14 text-center text-3xl text-richblack-100">
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
