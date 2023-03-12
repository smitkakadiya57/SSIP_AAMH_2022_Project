import { Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Footer from "../global/Footer";

import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";

const UserDashboard = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (userData._id === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="d-flex" id="wrapper">
        <UserSidebar />

        <div id="page-content-wrapper" className="d-flex  flex-column">
          <UserHeader />

          <div className="row m-3 ">
            <Outlet />
          </div>
          <div className="row m-0 mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
