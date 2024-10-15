import { Outlet } from "react-router-dom";
import Footer from "../shared/footer";
import Header from "../shared/header";

const Landing = () => {
  return (
    <div>
      Root Page in which all the routes will be places
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Landing;
