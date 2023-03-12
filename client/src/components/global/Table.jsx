import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ dataa, title }) => {
  const navigate = useNavigate();

  //usestate hook
  let [data, setData] = useState(dataa);
  const [select, setselect] = useState("");

  //Select onchage function, getting option selected value and save inside state variable
  function handleChange(e) {
    //set state variable with option value
    setselect(e.target.value);
  }

  // useEffect(() => {
  //   setData(dataa);
  // }, []);

  //hooks calls after rendering select state
  useEffect(() => {
    console.log();
    if (!(dataa === undefined)) {
      if (select === "All") {
        data = dataa;
      } else {
        //Doing filteration on according to select state option
        data = dataa.filter((dataa) => dataa.service === select);
      }

      //set state variable data after filteration
      setData(data);
    }
  }, [select]);

  //output
  return (
    <>
      <div className="row  mt-4  ">
        <h2 className="w-100 text-center mb-2">{title} </h2>

        <div className="mt-2 text-center">
          <select onChange={handleChange} className="form-select mb-2 w-25 ">
            <option> select application type </option>
            <option value="All"> All </option>
            {/* <option value="Land Registry">Land Registry</option> */}
            {/* <option value="Land Registry form 2">Land Registry Form 2</option> */}
            {/* <option value="Form 8A">Form 8A</option> */}
            {/* <option value="Ownership Transfer">Ownership Transfer</option> */}
            {/* <option value="Non Agricultural Activity"> */}
            {/* Non Agricultural Activity */}
            {/* </option> */}
          </select>
        </div>

        <table className="table text-center g-4 table-bordered ">
          <thead className="bg-light">
            <tr>
              <th scope="col">Applicant</th>
              <th scope="col">Application ID</th>
              <th scope="col">Service</th>

              <th scope="col"></th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele) => (
              <tr key={ele.applicationid}>
                <td>{ele.usertoken}</td>
                <td>{ele.applicationid}</td>
                <td>{ele.type}</td>

                <td className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/view/${ele.code}`)}
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
      </div>
    </>
  );
};

export default Table;
