import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import stamp from "../../assets/img/stamp.jpeg";

const UserApplication = () => {
  const { id, status } = useParams();

  const navigate = useNavigate();

  const [show, setshow] = useState(false);

  const [doc, setdoc] = useState([]);
  const [other, setother] = useState([]);
  // const [gen, setgen] = useState({});

  // let getApplication = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/application/find", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id }),
  //     });

  //     const data = await res.json();
  //     console.log(data.data[0]);

  //     const { doc, otherDetail, ...genObj } = data.data[0];
  //     setgen(genObj);
  //     setdoc(data.data[0].doc);
  //     setother(data.data[0].otherDetail);
  //     if (!(data.data[0].remark === "")) {
  //       setrmkfiels(false);
  //     }

  //   } catch (err) {
  //     window.alert(err.message);
  //   }
  // };

  let handleRedirect = () => {
    navigate("/User/Services/LandRegistry2");
  };

  let fetchApplication = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blockInd: id }),
      });

      const data = await res.json();

      console.log(data.block_data.data.content);

      let data_obj = data.block_data.data.content;

      const { doc, otherDetail, ...genObj } = data_obj;
      // setgen(genObj);
      setdoc(data_obj.doc);
      setother(data_obj.otherDetail);

      console.log(data_obj.doc);

      if (
        status === "accepted" &&
        data_obj.otherDetail.service === "Land Registry"
      ) {
        setshow(true);
      }
    } catch (err) {
      console.log(err.message);
      window.alert("something went wrong please try after some time");
      navigate("Myapplication");
    }
  };

  useEffect(() => {
    // getApplication();
    fetchApplication();
  }, []);

  return (
    <>
      <div>
        <div className="row border p-5">
          <h3 className="text-center mb-2"> View Application </h3>
          <div className="row   mb-5">
            <img src={stamp} />
          </div>
          <div className="">
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
                    <div key={ind} className="row  text-center">
                      <img
                        src={`data:${ele.docImg.contentType};base64,${ele.docImg.data}`}
                        width={50}
                        className="img-thumbnail w-50"
                      />
                    </div>
                  );
                })}

            {!show ? (
              ""
            ) : (
              <div className="mb-3 row d-flex justify-content-center mt-5">
                <button
                  className="btn btn-primary w-25"
                  onClick={handleRedirect}
                >
                  Proceed for Next Step
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserApplication;
