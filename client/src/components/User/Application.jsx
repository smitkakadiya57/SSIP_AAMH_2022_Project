import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

const Application = () => {
  const navigate = useNavigate();

  const Data = useSelector((state) => state.userData);

  const [appdata, setdata] = useState([]);

  const [isData, setisData] = useState({
    status: false,
    msg: "No Application",
  });

  let getApplication = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/application/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usertoken: Data.usertoken }),
      });

      const data = await res.json();
      if (data.error) {
        // window.alert(data.error);
        setisData({ status: false, msg: data.error });
      } else {
        setdata(data.data);
        console.log(appdata);
        setisData({ status: true, msg: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <>
      <div className="row  mt-4  ">
        <h2 className="w-100 text-center mb-2">My Application</h2>

        {!isData.status ? (
          <p className="text-center fs-5  mt-5 ">{isData.msg}</p>
        ) : (
          <table className="table text-center g-4 table-bordered">
            <thead className="bg-light">
              <tr>
                <th scope="col">Application ID</th>
                <th scope="col">Service</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                <th scope="col">Remark</th>
              </tr>
            </thead>
            <tbody>
              {appdata.map((ele) => (
                <tr key={ele.applicationid}>
                  <td>{ele.applicationid}</td>
                  <td>{ele.type}</td>
                  <td>{ele.status}</td>
                  {/* <td><TrackApplication/></td> */}
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => navigate(`${ele.code}/${ele.status}`)}
                      className="btn me-2  btn-primary btn-sm"
                    >
                      View
                    </button>
                  </td>
                  <td className="text-danger">{ele.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Application;
