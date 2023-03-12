import React from "react";
import Card from "../global/Card";
import Slider from "../global/Slider";

import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import { setUser } from "../../redux/action";

import s1 from "../../assets/img/dashboard/1.png";
import s2 from "../../assets/img/dashboard/2.png";
import s3 from "../../assets/img/dashboard/3.png";

const Dashboard = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state);

  return (
    <>
      <div className="row p-0 border  m-0">
        <Slider />
      </div>
      <div className="row  row-cols-1 row-cols-md-3 p-0 m-0 mt-5 ">
        <Card
          srcImg={s1}
          desc="User Personal Detail"
          btntitle="view"
          title="My Profile"
          path="myprofile"
          type="primary"
        />
        <Card
          srcImg={s2}
          desc="Government Services"
          btntitle="view"
          title="Services"
          path="Services"
          type="primary"
        />
        <Card
          srcImg={s3}
          desc="Your Submitted Application"
          btntitle="view"
          title="My Application"
          path="Myapplication"
          type="primary"
        />
      </div>
    </>
  );
};

export default Dashboard;
