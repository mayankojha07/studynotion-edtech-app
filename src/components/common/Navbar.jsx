import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import Button from "../core/Auth/Button";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { LiaAngleDownSolid } from "react-icons/lia";

// Navbar code
function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Fetching the categories from database
  const [subLinks, setSubLinks] = useState([]);
  const [sublinksLoading, setSubLinksLoading] = useState(false);

  async function fetchSubLinks() {
    setSubLinksLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("RESULT --> ", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Error while fetching sublinks");
      console.log("Error --> ", error);
    }
    setSubLinksLoading(false);
  }

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex justify-center items-center h-14 border-b border-richblue-700">
      <div className="w-11/12 max-w-maxContent flex flex-row items-center justify-between px-8">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="StudyNotion" width={160} height={42} />
        </Link>

        {/* Navlinks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25 items-center">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-2 group">
                      <p>{link.title}</p>
                      <LiaAngleDownSolid />

                      <div className="invisible absolute z-[100] left-[50%] top-[50%] translate-x-[-50%] translate-y-[1.5em] flex flex-col lg:w-[300px] text-richblack-900 bg-richblack-5 rounded-md opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 p-4">
                        <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] w-6 h-6 rounded rotate-45 bg-richblack-5" />

                        {sublinksLoading ? (
                          <div className="w-full flex justify-center">
                            <div className="">Loading...</div>
                          </div>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              // ?.filter(
                              // (subLink) => subLink?.courses?.length > 0
                              //)
                              ?.map((subLink, index) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  key={index}
                                  className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                                >
                                  <div className="text-richblack-900">
                                    {subLink.name}
                                  </div>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <div className="text-richblack-900">
                            No courses found!
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* //! Important */}
        {/* //! Login--//--Signup--//Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <CiShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && <Button path={"/login"}>Log in</Button>}

          {token === null && <Button path={"/signup"}>Sign up</Button>}

          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
