import React from "react";
import { Link, useNavigate } from "react-router-dom";

import userIco from "../../assets/img/india.png";
import { useSelector, useDispatch } from "react-redux";

import { setAdmin } from "../../redux/action";

const AdminHeader = () => {
  const Data = useSelector((state) => state.adminData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setAdmin({}));
    navigate("/");
  };

  const handleSidebar = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid ">
          <button
            className="btn btn-success"
            onClick={handleSidebar}
            id="sidebarToggle"
          >
            ☰
          </button>
          <Link className="navbar-brand text-center fs-4 " to="/">
            Electronic Secure Governance
          </Link>
          <div className="dropdown ">
            <span
              className="btn btn-secondary dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={userIco}
                className="user_ico rounded-circle me-2"
                alt=""
              />
              {Data.fname}
            </span>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="newapp">
                  New Application
                </Link>
              </li>

              <li>
                <button className="dropdown-item" onClick={handleLogOut}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminHeader;
