import React from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Slider from "../global/Slider";
import Card from "../global/Card";

import s1 from "../../assets/img/dashboard/7.png";
import s2 from "../../assets/img/dashboard/8.png";
import s3 from "../../assets/img/dashboard/9.png";

const AdDashboard = () => {
  return (
    <>
      <div className="row p-0 border  m-0">
        <Slider />
      </div>
      <div className="row  row-cols-1 row-cols-md-3 p-0 m-0 mt-5">
        <Card
          srcImg={s1}
          desc=""
          btntitle="view"
          title="My Profile"
          path="profile"
          type="success"
        />
        <Card
          srcImg={s2}
          desc=""
          btntitle="view"
          title="New Applications"
          path="newapp"
          type="success"
        />
        <Card
          srcImg={s3}
          desc=""
          btntitle="view"
          title="Accepted Applications"
          path="approve"
          type="success"
        />
      </div>
    </>
  );
};

export default AdDashboard;
