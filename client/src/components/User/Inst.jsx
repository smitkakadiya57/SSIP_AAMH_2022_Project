import { useNavigate } from "react-router-dom";

const Inst = () => {
  let navigate = useNavigate();

  let handleRedirect = () => {
    navigate("/User/Services/LandRegistry");
  };

  return (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center gap-5">
      <h2 className="text-center">Land Registry Application</h2>
      <button className="btn btn-primary w-25 " onClick={handleRedirect}>
        Start Application
      </button>
    </div>
  );
};

export default Inst;
