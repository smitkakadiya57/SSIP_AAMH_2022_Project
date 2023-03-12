import { Link, useNavigate } from "react-router-dom";

import userIco from "../../assets/img/india.png";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../redux/action";

const UserHeader = () => {
  const Data = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setUser({}));
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
            className="btn btn-primary"
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
                <Link className="dropdown-item" to="myprofile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="Myapplication">
                  My Application
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="Services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="Myproperty">
                  My Property
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

export default UserHeader;
