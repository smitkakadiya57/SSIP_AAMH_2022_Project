import React from "react";
import { useNavigate } from "react-router-dom";

const UserAction = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/registration")}
        className="btn btn-danger login-op  btn-lg p-3"
      >
        New User Registration
      </button>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="btn btn-success  login-op btn-lg p-3"
      >
        Existing User Login
      </button>
    </>
  );
};

export default UserAction;
