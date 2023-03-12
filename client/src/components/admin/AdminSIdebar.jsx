import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/esg.png";

import cdash from "../../assets/img/ico/cdash.png";
import cpro from "../../assets/img/ico/cpro.png";
import capp from "../../assets/img/ico/capp.png";
import chelp from "../../assets/img/ico/chelp.png";

const AdminSIdebar = () => {
  return (
    <>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-success">
          <img src={logo} className="side_logo" />
        </div>
        <div className="list-group  ">
          <NavLink
            className=" list-group-item list-group-item-action list-group-item-light  p-3"
            to="dashboard"
          >
            <img src={cdash} className="side-ico me-2" alt="" />
            DashBoard
          </NavLink>
          <NavLink
            className=" list-group-item list-group-item-action list-group-item-light  p-3"
            to="profile"
          >
            <img src={cpro} className="side-ico me-2" alt="" />
            My Profile
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="newapp"
          >
            <img src={capp} className="side-ico me-2" alt="" /> New Applications
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="review"
          >
            <img src={capp} className="side-ico me-2" alt="" /> Drop
            Applications
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="approve"
          >
            <img src={capp} className="side-ico me-2" alt="" /> Accepted
            Application
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="changetoken"
          >
            <img src={capp} className="side-ico me-2" alt="" /> Register
            Property
          </NavLink>
          <div className="nav-item">
            <a
              className="nav-link text-secondary"
              target="_blank"
              href="https://shivangipatel102.github.io/ChatbotDemo/"
            >
              <img src={chelp} className="side-ico me-2" alt="" /> Help Desk{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSIdebar;
