import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../global/Footer";

import AdminHeader from "./AdminHeader";
import AdminSIdebar from "./AdminSIdebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminData = useSelector((state) => state.adminData);

  useEffect(() => {
    if (adminData._id === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="d-flex" id="wrapper">
        <AdminSIdebar />

        <div id="page-content-wrapper" className="d-flex  flex-column">
          <AdminHeader />

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

export default AdminDashboard;
