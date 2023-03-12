import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setForm } from "../../redux/action";

import data from "../../tempDB/state.json";
import docData from "../../tempDB/reqDoc.json";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData);

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
                admin: "admin1",
              }),
            }
          );

          if (dbRes.status === 200) {
            dispatch(setForm({ applicationid: resdata.data.content.appid }));
            window.alert("Please Redy For Payment ");
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
  const [add, setadd] = useState({ district: "", village: "", taluko: "" });

  // dynamic dependent selectbox work
  const [loc, setloc] = useState({ list1: [], list2: [], list3: [] });

  let handleSelect = (e) => {
    // handleInput(e);
    setadd({ ...add, district: e.target.value });
    setloc({
      ...loc,
      list2: loc.list1.find((x) => x.district === e.target.value).taluka,
    });
  };

  let handleSelect2 = (e) => {
    setadd({ ...add, taluko: e.target.value });
    setloc({
      ...loc,
      list3: loc.list2.find((x) => x.region === e.target.value).village,
    });
  };

  const [field, setfield] = useState([]);

  //Loads the Districts when component loads
  useEffect(() => {
    setloc({ ...loc, list1: data.states });
  }, []);

  return (
    <>
      <div className="row m-0 mb-3 p-0">{/* <FormTimeline /> */}</div>
      <div className="row border p-4">
        <h3 className="mb-3 text-center">Application Form</h3>
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
                <option value="Land Registry">Land Registry</option>
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
                name="full_name"
                defaultValue={userData.fname}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="email" className="col-lg-2 col-sm-4 col-form-label">
              Email
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                defaultValue={userData.email}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="mno" className="col-lg-2 col-sm-4 col-form-label">
              Mobile No
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="mno"
                name="mobileno"
                defaultValue={userData.mobileno}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="address"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Address
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="district"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              District
            </label>
            <div className="col-lg-5  col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="district"
                value={add.district}
                onChange={handleSelect}
              >
                <option>--- select district----</option>
                {loc.list1.map((x) => {
                  return (
                    <option key={x.district} value={x.district}>
                      {x.district}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="district"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Property Type:
            </label>
            <div className="col-lg-5  col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="property_type"
              >
                <option>--- select ----</option>
                <option value="Agricultural">Agricultural</option>
                <option value="non_agricultural">Non-Agricultural</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="district"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Region:
            </label>
            <div className="col-lg-5  col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="region"
              >
                <option>--- select ----</option>
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="taluko"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Taluko
            </label>
            <div className="col-lg-5  col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="taluko"
                value={add.taluko}
                onChange={handleSelect2}
              >
                <option>--- select Taluko----</option>
                {loc.list2.map((x) => {
                  return (
                    <option key={x.region} value={x.region}>
                      {x.region}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="village"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Village
            </label>
            <div className="col-lg-5  col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="village"
                value={add.village}
                onChange={(e) => setadd({ ...add, village: e.target.value })}
              >
                <option>--- select village----</option>
                {loc.list3.map((x) => {
                  return (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="sbrOffice"
              className="col-lg-2 col-sm-4 col-form-label"
            >
              Sub Registrar Office
            </label>
            <div className="col-lg-5  col-sm-8">
              <select
                className="form-select"
                aria-label="Default select example"
                name="subregoffice"
              >
                {/* <option>----select sub registrare Office----- </option> */}
                <option value={`${add.taluko} Goverment Office`}>
                  {`${add.taluko} Goverment Office`}{" "}
                </option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="mno" className="col-lg-2 col-sm-4 col-form-label">
              Lawyer ID
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="mno"
                name="lawyerid"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="mno" className="col-lg-2 col-sm-4 col-form-label">
              Aadhar No
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="mno"
                name="Aadhar_no"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="mno" className="col-lg-2 col-sm-4 col-form-label">
              IAM Key
            </label>
            <div className="col-lg-5  col-sm-8">
              <input
                type="text"
                className="form-control"
                id="mno"
                name="IAM_Key"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="mno" className="col-lg-2 col-sm-4 col-form-label">
              Aadhar Card
            </label>
            <div className="col-lg-5  col-sm-8">
              <input type="file" className="form-control" name="files" />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="mno" className="col-lg-2 col-sm-4 col-form-label">
              Module Certificate
            </label>
            <div className="col-lg-5  col-sm-8">
              <input type="file" className="form-control" name="files" />
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

export default ApplicationForm;
