import { Outlet } from "react-router-dom";
import Header from "../shared/header";

const Landing = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Landing;
