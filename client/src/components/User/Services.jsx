import React from "react";

import Card from "../global/Card";

import serv1 from "../../assets/img/service/1.png";
import serv2 from "../../assets/img/service/2.png";
import serv3 from "../../assets/img/service/3.png";

const Services = () => {
  return (
    <>
      <div className="row mt-4 ">
        <h2 className="w-100 text-center mb-4">Services</h2>

        <div className="row   row-cols-1 row-cols-md-3 g-4  m-0">
          {/* <Card
            srcImg={serv1}
            desc="Transfer Ownership of Property"
            title="Ownership Transfer"
            btntitle="Apply Now"
            path="Ownership Transfer"
            type="primary"
          /> */}
          <Card
            srcImg={serv3}
            desc="Register Your Property"
            title="Land Registry"
            btntitle="Apply Now"
            path="Ins"
            type="primary"
          />
          <Card
            srcImg={serv3}
            desc="Generate Your Unique ID"
            title="Identity Management"
            btntitle="Apply Now"
            path="identity"
            type="primary"
          />
        </div>
      </div>
    </>
  );
};

export default Services;
