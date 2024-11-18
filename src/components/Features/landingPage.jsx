import { Outlet } from "react-router-dom";
import Footer from "../shared/footer";
import Header from "../shared/header";

const Landing = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Landing;
