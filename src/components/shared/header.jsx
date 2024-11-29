import { NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useState } from "react";
const Header = () => {
  const [header, setHeader] = useState([
    { component: "Home", path: "/" },
    { component: "Cart", path: "/cart" },
    { component: "Orders", path: "/orders" },
    { component: "Admin", path: "/admin" },
    { component: "Login", path: "/login" },
    { component: "Signup", path: "/signup" },
    { component: "Profile", path: "/profile" },
    { component: "Add Product", path: "/addProduct" },
  ]);
  return (
    <header className="site-header">
      <div className="site-identity">
        <h1>
          <NavLink>Reecom</NavLink>
        </h1>
      </div>
      <nav className="site-navigation">
        <ul className="nav">
          {header.map((headerItem) => {
            return (
              <li key={headerItem.component}>
                <NavLink to={headerItem.path}>{headerItem.component}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
