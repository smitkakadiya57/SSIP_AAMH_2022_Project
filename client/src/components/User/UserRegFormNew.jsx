import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegFormNew = () => {
  const navigate = useNavigate();

  const [form, setform] = useState({
    fname: "",
    email: "",
    mobileno: "",
    dob: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const resdata = await res.json(); // have new created user object

      if (res.status === 200) {
        console.log(resdata.data);
        const resBlock = await fetch("http://localhost:5000/api/mine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              type: "user_data",
              content: {
                fname: resdata.data.fname,
                email: resdata.data.email,
                mobileno: resdata.data.mobileno,
                dob: resdata.data.dob,
                gender: resdata.data.gender,
                usertoken: resdata.data.usertoken,
              },
            },
          }),
        });
        let blockId = await resBlock.json();
        window.alert(
          "User Register Sucessfully and Your BackUp code is " +
            blockId.blockInd
        );
        navigate("/login");
      } else {
        window.alert(resdata.error);
      }
    } catch (err) {
      console.log(err);
      window.alert("something went wrong");
    }
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setform({ ...form, [name]: value });
  };

  return (
    <>
      <div className="container-fluid  d-flex align-items-center bg-light ">
        <div className="container  mt-5 mb-5  p-5 w-75 form-shadow bg-white">
          <div className="row fs-1 mb-4">Registration Form</div>
          <form
            className="row g-3"
            id="userRegForm"
            encType="multipart/form-data"
          >
            <div className="col-md-6">
              <label htmlFor="fname" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                name="fname"
                value={form.name}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.name}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobileno" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="mobileno"
                name="mobileno"
                value={form.name}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="dob" className="form-label">
                Date Of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={form.name}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleInput}
                  />
                  male
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleInput}
                  />
                  female
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="transgender"
                    onChange={handleInput}
                  />
                  transgender
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={form.name}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="cpassword"
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={form.name}
                onChange={handleInput}
              />
            </div>

            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegFormNew;
