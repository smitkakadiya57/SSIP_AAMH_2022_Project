import { useState } from "react";

const Identity = () => {
  const [hash, sethash] = useState("");

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
        const blockReq = await fetch("http://localhost:5000/api/mine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: resdata.data }),
        });

        let blockRes = await blockReq.json();
        if (blockReq.status === 200) {
          console.log(resdata.data);
          sethash(resdata.data.content.otherDetail);
        }
      }
    } catch (err) {
      console.log(err);
      console.log("something went wrong");
    }
  };

  return (
    <div className="container-fluid  d-flex flex-column align-items-center bg-light ">
      <div className="container  mt-5 mb-5  p-5 w-75 border bg-white">
        <div className="row fs-1 mb-4">Identity Registration</div>
        <form className="row g-3" id="appForm" encType="multipart/form-data">
          <div className="col-lg-5 col-sm-8">
            <select
              className="form-select"
              aria-label="Default select example"
              name="service"
              defaultValue="Identity Management"
            >
              <option value="Identity Management">Identity Management</option>
            </select>
          </div>
          <div className="col-md-12">
            <label htmlFor="pname" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="Name" />
          </div>
          <div className="col-md-12">
            <label htmlFor="pname" className="form-label">
              Email
            </label>
            <input type="text" className="form-control" name="Email" />
          </div>
          <div className="col-md-12">
            <label htmlFor="pname" className="form-label">
              Mobile no
            </label>
            <input type="text" className="form-control" name="Mobile_no" />
          </div>
          <div className="col-md-12">
            <label htmlFor="dob" className="form-label">
              Date Of Birth
            </label>
            <input type="date" className="form-control" id="dob" name="DOB" />
          </div>
          <div className="col-md-12">
            <label htmlFor="dob" className="form-label">
              Fingerprint
            </label>
            <input type="file" className="form-control" id="dob" name="files" />
          </div>

          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="container  mt-5 mb-5  p-5 w-75 border bg-white">
        {hash === "" ? (
          ""
        ) : (
          <>
            <h5>Your Digital Signature Is : </h5>
            <p>{hash}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Identity;
