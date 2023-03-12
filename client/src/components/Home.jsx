import React from "react";

import Navbar from "./home/Navbar";
import Slider from "./global/Slider";
import AboutUs from "./home/AboutUs";
import UserAction from "./home/UserAction";
import Circular from "./home/Circular";
import Footer from "./global/Footer";

const Home = () => {
  return (
    <>
      <div className="container-fluid p-0">
        <Navbar />
        <Slider />
        <div className="row mt-3 mb-3 p-4  gap-4 ">
          <div className="col border  ">
            <div className="row p-4 ">
              <AboutUs />
            </div>
            <div className="row gap-2 p-5">
              <UserAction />
            </div>
          </div>
          <div className="col-sm-4  p-0  ">
            <Circular />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
