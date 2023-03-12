import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "../../redux/action";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state);

  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    role: "admin1",
  });

  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // console.log(adminData);
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(adminData),
      });

      const resdata = await res.json();
      // console.log(resdata);

      if (res.status === 200) {
        dispatch(setAdmin(resdata.data));

        navigate("/admin/dashboard");
      } else {
        window.alert(resdata.error);
        // window.alert("Invalid Credentials");
        setAdminData({ email: "", password: "", role: "admin1" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div>
          <link rel="stylesheet" type="text/css" href="css/styles.css" />
          <div className="login-root">
            <div
              className="box-root flex-flex flex-direction--column"
              style={{ minHeight: "100vh", flexGrow: 1 }}
            >
              <div
                className="box-root padding-top--24 flex-flex flex-direction--column"
                style={{ flexGrow: 1, zIndex: 9 }}
              >
                <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                  <h1 className="color-text login-title text-success">
                    Admin Log In
                  </h1>
                </div>
                <div className="formbg-outer">
                  <div className="formbg">
                    <div className="formbg-inner padding-horizontal--48">
                      {/* <span class="padding-bottom--15">Sign in to your account</span> */}
                      <form id="stripe-login">
                        <div className="field padding-bottom--24">
                          <label htmlFor="role">Role</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="role"
                            value={adminData.role}
                            onChange={handleInput}
                          >
                            <option value="admin1">Admin 1</option>
                            <option value="admin2">Admin 2</option>
                          </select>
                        </div>
                        <div className="field padding-bottom--24">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={adminData.email}
                            onChange={handleInput}
                          />
                        </div>
                        <div className="field padding-bottom--24">
                          <div className="grid--50-50">
                            <label htmlFor="password">Password</label>
                          </div>
                          <input
                            type="password"
                            name="password"
                            value={adminData.password}
                            onChange={handleInput}
                          />
                        </div>
                        <div>
                          <div className="reset-pass">
                            <a href="#">Forgot your password?</a>
                          </div>
                        </div>
                        <div className="field padding-bottom--24">
                          <input
                            type="submit"
                            name="submit"
                            defaultValue="Login"
                            className="bg-success"
                            onClick={handleSubmit}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="footer-link padding-top--24">
                    <span>
                      <a href="/" className="text-primary fs-4 ">
                        Back to Home
                      </a>
                    </span>
                    <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                      <span>© E-Secure Governance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
