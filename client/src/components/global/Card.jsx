import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ srcImg, title, desc, btntitle, path, type }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col ">
        <div className="card h-100 p-3 shadow">
          <img
            src={srcImg}
            className="card-img-top align-self-center img-serve "
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
          </div>
          <div className="card-footer text-center bg-white border-0">
            <button
              className={`btn btn-${type}`}
              onClick={() => navigate(`${path}`)}
            >
              {btntitle}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Card.defaultProps = {
  btntitle: "Apply Now",
};

export default Card;
