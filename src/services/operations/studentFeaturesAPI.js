import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const buyCourse = async (
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) => {
  const toastId = toast.loading("Loading...");

  try {
    // load script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    // validate response
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    // call the capture payment api to initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    // validate response
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    console.log("ORDER RESPONSE -> ", orderResponse);

    const options = {
      key: process.env.RAZORPAY_SECRET,
      amount: orderResponse.data.data.amount,
      currency: orderResponse.data.data.currency,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description:
        "Thankyou for purchasing the course and all the best for you journey.",
      image: rzpLogo,
      prefills: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // send payment success email
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );

        // verify payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment failed");
      console.log("RESPONSE ERROR -> ", response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR -> ", error);
    toast.error("Could not make payment");
  }

  toast.dismiss(toastId);
};

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.log("SEND PAYMENT SUCCESS EMAIL ERROR -> ", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment verified");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("VERIFY PAYMENT API ERROR -> ", error);
    toast.error("Could not verify the payment");
  }

  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
