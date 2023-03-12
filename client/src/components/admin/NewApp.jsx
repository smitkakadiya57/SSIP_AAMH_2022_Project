import React from "react";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Table from "../global/Table";

const NewApp = () => {
  const navigate = useNavigate();

  const Data = useSelector((state) => state.adminData);
  const [appdata, setdata] = useState([]);

  let getApplication = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/application/getall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "pending", admin: Data.role }),
      });

      const data = await res.json();
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
      <Table dataa={appdata} title="New Application" />
    </>
  );
};

export default NewApp;
