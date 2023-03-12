import { NavLink } from "react-router-dom";

import logo from "../../assets/img/esg.png";

import app from "../../assets/img/ico/app.png";
import cont from "../../assets/img/ico/cont.png";
import dash from "../../assets/img/ico/dash.png";
import help from "../../assets/img/ico/help.png";
import pro from "../../assets/img/ico/pro.png";
import serv from "../../assets/img/ico/serv.png";

const UserSidebar = () => {
  return (
    <>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-primary">
          <img src={logo} className="side_logo" />
        </div>
        <div className="list-group  ">
          <NavLink
            className=" list-group-item list-group-item-action list-group-item-light  p-3"
            to="dashboard"
          >
            <img src={dash} className="side-ico me-2" alt="" />
            DashBoard
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="myprofile"
          >
            <img src={pro} className="side-ico me-2" alt="" /> My Profile
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="Myapplication"
          >
            <img src={app} className="side-ico me-2" alt="" /> My Applications
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="Services"
          >
            <img src={serv} className="side-ico me-2" alt="" />
            Services
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="Myproperty"
          >
            <img src={serv} className="side-ico me-2" alt="" /> Property
          </NavLink>
          {/* <NavLink
            className="list-group-item disabled list-group-item-action list-group-item-light p-3"
            to="about"
          >
            <img src={cont} className="side-ico me-2" alt="" /> About Us
          </NavLink> */}
          {/* <NavLink
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="contactus"
          >
           <img src={help} className="side-ico me-2" alt="" /> Help Desk
          </NavLink> */}
          <div className="nav-item">
            <a
              className="nav-link text-secondary"
              target="_blank"
              href="https://shivangipatel102.github.io/ChatbotDemo/"
            >
              <img src={help} className="side-ico me-2" alt="" /> Help Desk{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
