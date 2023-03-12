import React from "react";

import { useSelector } from "react-redux";

const Profile = () => {
  const Data = useSelector((state) => state.userData);

  console.log(Data);

  return (
    <>
      <div className="row mt-4 ">
        <h2 className="w-100 text-center mb-4">My Profile</h2>
        <div className="border p-5 mx-auto w-50">
          <div className="mb-3 row">
            <label htmlFor="name" className="col-4 col-form-label">
              Name
            </label>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="name"
                defaultValue={Data.fname}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="email" className="col-4 col-form-label">
              Email
            </label>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="email"
                defaultValue={Data.email}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="mno" className="col-4 col-form-label">
              Mobile No
            </label>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="mno"
                defaultValue={Data.mobileno}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="gen" className="col-4 col-form-label">
              Gender
            </label>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="gen"
                defaultValue={Data.gender}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="dob" className="col-4 col-form-label">
              Date of Birth{" "}
            </label>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="dob"
                defaultValue={Data.dob}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="dob" className="col-4 col-form-label">
              User Token{" "}
            </label>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="dob"
                defaultValue={Data.usertoken}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
