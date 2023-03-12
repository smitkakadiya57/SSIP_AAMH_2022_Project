import { useState } from "react";
import uniqid from "uniqid";

const Property = () => {
  const [form, setform] = useState({
    pid: "",
    ntoken: "",
    code: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setform({ ...form, [name]: value });
  };

  const [prty, setprty] = useState({
    pid: uniqid("prty"),
    sno: "",
    district: "",
    ward: "",
    owner: "",
    loan: "",
    other: "",
    reg_owner: "",
  });

  const handleInput2 = (e) => {
    name = e.target.name;
    value = e.target.value;
    setprty({ ...prty, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resBlock = await fetch("http://localhost:5000/api/mine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            type: "property_token",
            content: {
              property_id: form.pid,
              owner_token: form.ntoken,
              property_code: form.code,
            },
          },
        }),
      });

      if (resBlock.status === 200) {
        const resDB = await fetch(
          "http://localhost:3000/api/property/changetoken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              propertyid: form.pid,
              owner_token: form.ntoken,
            }),
          }
        );

        if (resDB.status === 200) {
          window.alert("Token Change Successfull");
          setform({
            pid: "",
            ntoken: "",
            code: "",
          });
        }
      }
    } catch (err) {
      console.log(err);
      window.alert("something went wrong");
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const resBlock = await fetch("http://localhost:5000/api/mine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            type: "property_data",
            content: prty,
          },
        }),
      });

      if (resBlock.status === 200) {
        let Ind = await resBlock.json();
        const resDB = await fetch("http://localhost:3000/api/property/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyid: prty.pid,
            owner_token: prty.reg_owner,
            code: Ind.blockInd,
          }),
        });

        if (resDB.status === 200) {
          window.alert("Property Registered with Property ID : " + prty.pid);
          setprty({
            sno: "",
            district: "",
            pid: "",
            ward: "",
            owner: "",
            loan: "",
            other: "",
            reg_owner: "",
          });
        }
      }
    } catch (err) {
      console.log(err);
      window.alert("something went wrong");
    }
  };

  return (
    <>
      <div className="container-fluid  d-flex flex-column align-items-center bg-light ">
        <div className="container  mt-5 mb-5  p-5 w-75 border bg-white">
          <div className="row fs-1 mb-4">Register Property</div>
          <form className="row g-3" id="propForm" encType="multipart/form-data">
            <div className="col-md-12">
              <label htmlFor="pname" className="form-label">
                Survey No
              </label>
              <input
                type="text"
                className="form-control"
                name="sno"
                value={prty.sno}
                onChange={handleInput2}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="pname" className="form-label">
                District
              </label>
              <input
                type="text"
                className="form-control"
                name="district"
                value={prty.district}
                onChange={handleInput2}
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="reg_owner" className="form-label">
                Ward no
              </label>
              <input
                type="text"
                className="form-control"
                name="ward"
                value={prty.ward}
                onChange={handleInput2}
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="reg_owner" className="form-label">
                Owner Name
              </label>
              <input
                type="text"
                className="form-control"
                name="owner"
                value={prty.owner}
                onChange={handleInput2}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="reg_owner" className="form-label">
                Loan Info
              </label>
              <input
                type="text"
                className="form-control"
                name="loan"
                value={prty.loan}
                onChange={handleInput2}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="reg_owner" className="form-label">
                Other Info
              </label>
              <input
                type="text"
                className="form-control"
                name="other"
                value={prty.other}
                onChange={handleInput2}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="reg_owner" className="form-label">
                Local office Token
              </label>
              <input
                type="text"
                className="form-control"
                name="reg_owner"
                value={prty.reg_owner}
                onChange={handleInput2}
              />
            </div>

            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={handleSubmit2}
              >
                Register
              </button>
            </div>
          </form>
        </div>

        {/* <div className="container  mt-5 mb-5  p-5 w-75 border bg-white">
          <div className="row fs-1 mb-4">Modify Property Tokens</div>
          <form
            className="row g-3" 
            id="tokenForm"
            encType="multipart/form-data"
          >
            <div className="col-md-12">
              <label htmlFor="pid" className="form-label">
                Property ID
              </label>
              <input
                type="text"
                className="form-control"
                name="pid"
                value={form.pid}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="ntoken" className="form-label">
                New Owner Token
              </label>
              <input
                type="text"
                className="form-control"
                name="ntoken"
                value={form.ntoken}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <input
                type="number"
                className="form-control"
                name="code"
                value={form.code}
                onChange={handleInput}
              />
            </div>

            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
              >
                Change Token
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default Property;
