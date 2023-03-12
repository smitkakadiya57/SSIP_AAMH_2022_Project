import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setForm } from "../../redux/action";

const Form8A = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData);

  //   const { type } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let appForm = document.getElementById("appForm");
    try {
      const res = await fetch("http://localhost:3000/api/application/add", {
        method: "POST",
        body: new FormData(appForm),
      });

      const resdata = await res.json();
      console.log(resdata.data);

      if (res.status === 201) {
        // dispatch(setForm(data.data));
        const blockReq = await fetch("http://localhost:5000/api/mine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: resdata.data }),
        });

        let blockRes = await blockReq.json();

        if (blockReq.status === 200) {
          const dbRes = await fetch(
            "http://localhost:3000/api/application/addindb",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                usertoken: userData.usertoken,
                code: blockRes.blockInd,
                id: resdata.data.content.appid,
                type: resdata.data.content.service,
                admin: "admin2",
              }),
            }
          );

          if (dbRes.status === 200) {
            dispatch(setForm({ applicationid: resdata.data.content.appid }));
            // window.alert("Please Redy For Payment ");
            navigate("/payment");
          }
        }
      } else {
        window.alert("Fill the form again");
      }
    } catch (err) {
      window.alert("Please Fill the form Correctly...");
      console.log(err);
    }
  };

  return (
    <>
      <div className="row m-0 mb-3 p-0">{/* <FormTimeline /> */}</div>
      <div className="row border p-4">
        <h3 className="mb-3 text-center">Form 8A</h3>
        <form id="appForm">
          <div className="row mb-3">
            <label
              htmlFor="service"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Service Type
            </label>
            <div className="col-lg-5 col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="service"
                defaultValue="Land Registry"
              >
                <option value="Form 8A">Form 8A</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Name
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Khata Number
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                name="khata_no"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Owner's Name
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                name="owner_name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Taluka
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                name="taluka"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Form 6's Note Number:
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="number"
                className="form-control"
                id="name"
                name="form6_note_no"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Survey Number:
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="number"
                className="form-control"
                id="name"
                name="survey_no"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Area:
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="number"
                className="form-control"
                id="name"
                name="area"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Perimeter
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="number"
                className="form-control"
                id="name"
                name="perimeter"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="name" className="col-lg-2 col-sm-4 col-form-label">
              Other Details
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                name="other_detail"
              />
            </div>
          </div>

          <input
            type="submit"
            className="btn text-center  btn-outline-primary"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default Form8A;
