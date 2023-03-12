import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/action";
import { Link } from "react-router-dom";

const UserLoginNew = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state);

  const navigate = useNavigate();

  const [userData, setuserData] = useState({ email: "", password: "" });

  let name, value;
  const handleInput = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setuserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // console.log(userData);

    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        dispatch(setUser(data.data));

        navigate("/user/dashboard");
      } else {
        window.alert(data.error);
        setuserData({ email: "", password: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid  border vh-100 d-flex  align-items-center bg-light ">
        <div className="container w-50 ">
          <div className="row mb-2 ">
            <h1 className="text-center text-primary">Log In</h1>
          </div>
          <div className="row  p-5 container form-shadow  bg-white">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control  form-control-lg"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <a href="#">Forgot Your Password ? </a>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                LOGIN
              </button>
            </div>
          </div>
          <div className="row text-center mt-3">
            <p>
              {" "}
              Don't have account ? <Link to="/registration">SignUp</Link>
            </p>
            <Link to="/" className="fs-3 ">
              Back to Home
            </Link>
            <p className="mt-4">© E-Secure Governance</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginNew;
