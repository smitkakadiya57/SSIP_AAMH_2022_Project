import React from "react";
import GooglePayButton from "@google-pay/button-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setForm } from "../../redux/action";

const GPay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.formData);

  const [done, setdone] = useState(false);

  const handlePayment = () => {
    // window.alert("payment successfull");
    dispatch(setForm({}));
    navigate("/user/Myapplication");
  };

  return (
    <div className="container  w-50 text-center p-5 bg-light  border rounded m-auto mt-5">
      <h1>Payment Gateway</h1>
      <p>Please redy to pay application fee for </p>
      <h5>
        Application ID : <b>{formData.applicationid} </b>
      </h5>
      <p className="text-danger">
        Please Login to Your Google Account for Payment{" "}
      </p>
      <GooglePayButton
        environment="TEST"
        buttonColor="white"
        buttonType="pay"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,

          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "1.00",
            currencyCode: "USD",
            countryCode: "US",
          },
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("load payment data", paymentRequest);
          setdone(true);
        }}
      />
      <br />
      {!done ? (
        ""
      ) : (
        <>
          <h3 className="text-success">Payment Successfull</h3>
          <button className="btn btn-success" onClick={handlePayment}>
            Go to DashBoard
          </button>
        </>
      )}
    </div>
  );
};

export default GPay;
