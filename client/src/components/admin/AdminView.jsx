import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import stamp from "../../assets/img/stamp.jpeg";

const AdminView = () => {
  const { app } = useParams();

  const navigate = useNavigate();

  const [doc, setdoc] = useState([]);
  const [other, setother] = useState([]);
  const [gen, setgen] = useState({});

  let getApplication = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blockInd: app }),
      });

      const data = await res.json();

      let data_obj = data.block_data.data.content;

      // const { doc, otherDetail, ...genObj } = data.data[0];
      // setgen(genObj);
      // setdoc(data.data[0].doc);
      // setother(data.data[0].otherDetail);

      const { doc, otherDetail, ...genObj } = data_obj;
      setgen(genObj);
      setdoc(data_obj.doc);
      setother(data_obj.otherDetail);
    } catch (err) {
      window.alert("Application Not Available");
      navigate(-1);
    }
  };

  const [remark, setremark] = useState("");

  const setRemark = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/application/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: gen.appid, msg: remark }),
      });

      if (res.status === 200) {
        const resBlock = await fetch("http://localhost:5000/api/mine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              type: "application_status",
              content: {
                applicationid: gen.appid,
                application_code: app,
                status: "rejected",
                remark,
              },
            },
          }),
        });

        if (resBlock.status === 200) {
          window.alert("Application Rejected");
          navigate(-1);
        } else {
          window.alert("Application Not Rejected try after some time");
          navigate(-1);
        }
      } else {
        window.alert("Application Not Rejected try after some time");
        navigate(-1);
      }
    } catch (err) {
      window.alert(err.message);
    }
  };

  const acceptApplication = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/application/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: gen.appid }),
      });

      if (res.status === 200) {
        const resBlock = await fetch("http://localhost:5000/api/mine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              type: "application_status",
              content: {
                applicationid: gen.appid,
                application_code: app,
                status: "accepted",
                remark,
              },
            },
          }),
        });

        if (resBlock.status === 200) {
          window.alert("Application Accepted");
          navigate(-1);
        } else {
          window.alert("Application Not Accepted try after some time");
          navigate(-1);
        }
      } else {
        window.alert("Application Not Accepted try after some time");
        navigate(-1);
      }
    } catch (err) {
      window.alert(err.message);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <>
      <div>
        <div className="row border p-5">
          <h3 className="text-center mb-2"> Verify Application </h3>
          <div className="row  mb-5">
            <img src={stamp} />
          </div>
          <div className="">
            <div className="mb-3 row ">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Application ID
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext w-50"
                  id="staticEmail"
                  defaultValue={gen.appid}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Service Type
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="staticEmail"
                  defaultValue={gen.service}
                />
              </div>
            </div>

            {Object.entries(other).map((ele) => {
              return (
                <div className="mb-3 row" key={ele[0]}>
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    {ele[0]}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      defaultValue={ele[1]}
                    />
                  </div>
                </div>
              );
            })}

            {!doc
              ? ""
              : doc.map((ele, ind) => {
                  return (
                    <div key={ind} className="row mt-3  ">
                      <img
                        src={`data:${ele.docImg.contentType};base64,${ele.docImg.data}`}
                        className="w-50 border "
                      />
                    </div>
                  );
                })}

            <>
              <div className="mt-3 d-flex flex-row justify-content-center">
                <button
                  type="button"
                  className="btn btn-success me-3"
                  onClick={acceptApplication}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#remarkModal"
                >
                  Reject
                </button>
              </div>
            </>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="remarkModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Remark for {gen.appid}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <input
                class="form-control form-control-lg"
                type="text"
                value={remark}
                onChange={(e) => setremark(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={setRemark}
                data-dismiss="modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminView;
