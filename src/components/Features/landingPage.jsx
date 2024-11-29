import { Outlet } from "react-router-dom";
import Header from "../shared/header";
import SideNav from "../shared/sidenav";

const Landing = () => {
  return (
    <div>
      <Header></Header>
      <SideNav></SideNav>
      <Outlet></Outlet>
    </div>
  );
};

export default Landing;
