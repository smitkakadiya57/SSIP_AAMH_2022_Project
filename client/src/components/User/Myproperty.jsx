import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const Myproperty = () => {
  const userData = useSelector((state) => state.userData);

  const [prop, setprop] = useState([]);
  const [isData, setisData] = useState({ status: false, msg: "No Property" });

  const fetchProp = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/property/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownertoken: userData.usertoken }),
      });

      const data = await res.json();
      if (data.error) {
        // window.alert(data.error);
        setisData({ status: false, msg: data.error });
      } else {
        setprop(data.data);
        console.log(data.data);
        setisData({ status: true, msg: "" });
      }
    } catch (err) {
      window.alert(err);
    }
  };

  const [propdata, setpropdata] = useState({});

  const getProp = async (code) => {
    try {
      const res = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blockInd: code }),
      });
      const data = await res.json();
      setpropdata({ ...data.block_data.data.content, code });
      console.log(data.block_data.data.content);
    } catch (err) {
      window.alert(err);
    }
  };

  useEffect(() => {
    fetchProp();
  }, []);

  return (
    <>
      <div className="row  mt-4  ">
        <h2 className="w-100 text-center mb-2">My Property</h2>
        <div className="col-md-6">
          {!isData.status ? (
            <p className="text-center fs-5  mt-5 ">{isData.msg}</p>
          ) : (
            <table className="table text-center g-4 table-bordered">
              <thead className="bg-light">
                <tr>
                  <th scope="col">Property ID</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {prop.map((ele) => (
                  <tr key={ele.propertyid}>
                    <td>{ele.propertyid}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => getProp(ele.code)}
                        className="btn me-2  btn-primary btn-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-md-6 border">
          {!propdata.pid ? (
            "Property Data Display Here"
          ) : (
            <table className="table text-left g-4 table-borderless">
              <tbody>
                <tr>
                  <td>Property ID</td>
                  <td>{propdata.pid} </td>
                </tr>
                <tr>
                  <td>Property Code</td>
                  <td>{propdata.code} </td>
                </tr>
                <tr>
                  <td>Survey No</td>
                  <td>{propdata.sno} </td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>{propdata.district} </td>
                </tr>
                <tr>
                  <td> Local office Token</td>
                  <td>{propdata.reg_owner} </td>
                </tr>
                <tr>
                  <td>Ward no</td>
                  <td>{propdata.ward} </td>
                </tr>
                <tr>
                  <td>Owner Name</td>
                  <td>{propdata.owner} </td>
                </tr>
                <tr>
                  <td>Loan Info</td>
                  <td>{propdata.loan} </td>
                </tr>
                <tr>
                  <td>Other Info</td>
                  <td>{propdata.other} </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Myproperty;
