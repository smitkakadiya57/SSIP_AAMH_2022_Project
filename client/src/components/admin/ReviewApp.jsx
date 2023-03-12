import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../global/Table";

const ReviewApp = () => {
  const [appdata, setdata] = useState([]);
  const Data = useSelector((state) => state.adminData);
  let getApplication = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/application/getall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "rejected", admin: Data.role }),
      });

      const data = await res.json();
      // console.log(data.data);
      setdata(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <>
      <Table dataa={appdata} title="Rejected Application" />
    </>
  );
};

export default ReviewApp;
