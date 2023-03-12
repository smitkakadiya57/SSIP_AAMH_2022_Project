import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "../../redux/action";

const AdminLoginnew = () => {
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
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      <div className="container-fluid  border vh-100 d-flex  align-items-center bg-light">
        <div className="container w-50 ">
          <div className="row mb-2 ">
            <h1 className="text-center text-success">Admin Log In</h1>
          </div>
          <div className="row  p-5 container form-shadow   bg-white">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Role
              </label>
              <select
                className="form-select  form-select-lg"
                aria-label="Default select example"
                name="role"
                value={adminData.role}
                onChange={handleInput}
              >
                <option value="admin1">Admin 1</option>
                <option value="admin2">Admin 2</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={adminData.email}
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
                value={adminData.password}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <a href="#">Forgot Your Password ? </a>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
              >
                LOGIN
              </button>
            </div>
          </div>
          <div className="row text-center mt-3">
            <a href="/" className="fs-3 ">
              Back to Home
            </a>
            <p className="mt-4">© E-Secure Governance</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginnew;
