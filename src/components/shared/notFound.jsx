import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const clickToHome = () => {
    navigate("/");
  };
  return (
    <>
      Not Found <button onClick={clickToHome}>Click to Home</button>
    </>
  );
};

export default NotFound;
