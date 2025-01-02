import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, logout } from "../Redux/reducers/authReducer";

const Header = () => {
  const token = useSelector((state) => state.auth.token); // Read the token from the Redux store
  const adminToken = useSelector((state) => state.auth.adminToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(token);

  console.log(adminToken);
  const headerItems = [
    { component: "Home", path: "/" },
    { component: "Cart", path: "/cart" },
    { component: "Orders", path: "/orders" },
    { component: "Admin Login", path: "/adminLogin" },
    { component: "Profile", path: "/profile" },
  ];

  const filteredHeader = token
    ? headerItems
    : [
        ...headerItems,
        { component: "Login", path: "/login" },
        { component: "Signup", path: "/signup" },
      ];

  const filterHeaderForAdmin = [
    { component: "Add Product", path: "/addProduct" },
  ];

  const onLogout = () => {
    if (adminToken) {
      dispatch(adminLogout());
    }
    if (token) {
      dispatch(logout());
    }
    navigate("/");
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
          {adminToken &&
            filterHeaderForAdmin.map((headerItem) => (
              <li key={headerItem.component}>
                <NavLink to={headerItem.path}>{headerItem.component}</NavLink>
              </li>
            ))}

          {(token || adminToken) && (
            <li>
              <NavLink onClick={onLogout}> Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
