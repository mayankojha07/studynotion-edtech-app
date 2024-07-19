import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";

function SidebarLink({ link }) {
  const Icon = Icons[link.icon];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const routeMatched = matchRoute(link.path);

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        routeMatched ? "bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50 ${
          routeMatched ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`${
          routeMatched ? "text-yellow-50" : "text-white"
        } tracking-wide flex items-center gap-x-2`}
      >
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}

export default SidebarLink;
