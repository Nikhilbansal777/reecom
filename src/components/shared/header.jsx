import { NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/reducers/authReducer";

const Header = () => {
  const token = useSelector((state) => state.auth.token); // Read the token from the Redux store
  const dispatch = useDispatch();

  const headerItems = [
    { component: "Home", path: "/" },
    { component: "Cart", path: "/cart" },
    { component: "Orders", path: "/orders" },
    { component: "Admin", path: "/admin" },
    { component: "Profile", path: "/profile" },
    { component: "Add Product", path: "/addProduct" },
  ];

  const filteredHeader = token
    ? headerItems
    : [
        ...headerItems,
        { component: "Login", path: "/login" },
        { component: "Signup", path: "/signup" },
      ];

  const onLogout = () => {
    dispatch(logout())
  };
  return (
    <header className="site-header">
      <div className="site-identity">
        <h1>
          <NavLink to="/">Reecom</NavLink>
        </h1>
      </div>
      <nav className="site-navigation">
        <ul className="nav">
          {filteredHeader.map((headerItem) => (
            <li key={headerItem.component}>
              <NavLink to={headerItem.path}>{headerItem.component}</NavLink>
            </li>
          ))}
         {token && <li>
            <NavLink onClick={onLogout}> Logout</NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
