import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-3.5rem)] flex ">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
