import { NavLink } from "react-router-dom";

import logo from "../../assets/img/esg.png";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="ESG" className="nav_ico" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="#">
                  Home
                </NavLink>
              </li>
              {/* <li className="nav-item">
          <NavLink className="nav-link"  to=" ">About</NavLink>
        </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/adminlogin">
                  Admin Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Online Application
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://shivangipatel102.github.io/ChatbotDemo/"
                >
                  {" "}
                  Help Desk{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
