import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setForm } from "../../redux/action";
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.formData);

  const handlePayment = () => {
    window.alert("payment successfull");
    dispatch(setForm({}));
    navigate("/user/Myapplication");
  };

  return (
    <>
      <div className="container w-50 m-auto text-center border bg-light p-5 rounded mt-5">
        <h1>Payment Gateway</h1>
        <p>Please redy to pay application fee for </p>
        <h5>
          Application ID : <b>{formData.applicationid} </b>
        </h5>
        <button className="btn btn-primary" onClick={handlePayment}>
          PAY NOW
        </button>
      </div>
    </>
  );
};

export default Payment;
