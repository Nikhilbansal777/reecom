import { Link } from "react-router-dom";
import "../../styles/sideNav.css";
import { useState } from "react";
const SideNav = () => {
  const [sidebBars, setSideBars] = useState([
    { component: "Mobile", path: "/mobile" },
    { component: "Laptop", path: "/laptop" },
    { component: "Accessories", path: "/accessories" },
    { component: "Clothing", path: "/clothing" },
    { component: "Sports", path: "/sports" },
    { component: "Shoes", path: "/shoes" },
  ]);
  return (
    <div className="main-container">
      <div className="sidebar">
        <ul>
          {sidebBars.map((sidebar) => (
            <li key={sidebar.component}>
              <Link to={sidebar.path}>{sidebar.component}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
