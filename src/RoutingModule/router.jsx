import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../components/Features/home";
import Login from "../components/auth/login";
import Landing from "../components/Features/landingPage";
import Signup from "../components/auth/signup";
import Profile from "../components/Features/profile";
import Orders from "../components/Features/orders";
import Cart from "../components/Features/cart";
import AddProduct from "../components/Features/addProduct";
import Mobile from "../components/Features/Category/Mobile";
import Laptop from "../components/Features/Category/Laptop";
import Clothing from "../components/Features/Category/Clothing";
import Product from "../components/Features/Product";
import Shoes from "../components/Features/Category/Shoes";
import Sports from "../components/Features/Category/Sports";
import Accessories from "../components/Features/Category/Accessories";
import NotFound from "../components/shared/notFound";
import ProtectedRoute from "./protectedRoute";
import Practice from "../components/practce";
import AdminLogin from "../components/auth/adminLogin";
import ProtectedAdminRoute from "./protectedAdminRoute";
import AdminDashboard from "../components/Features/Admin/adminDashboard";

const token = localStorage.getItem("token");
const adminToken = localStorage.getItem("adminToken");

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing></Landing>}>
      <Route path="practice" element={<Practice />}></Route>
      <Route index element={<Home />}></Route>
      {!token && (
        <>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
        </>
      )}

      {!adminToken && (
        <>
          <Route path="/adminLogin" element={<AdminLogin />}></Route>
        </>
      )}

      <Route element={<ProtectedAdminRoute />}>
        <Route
          path="adminLogin"
          element={<Navigate to={"/adminDashboard"} />}
        ></Route>
        <Route path="addProduct" element={<AddProduct />}></Route>
        <Route path="addProduct/:id" element={<AddProduct />}></Route>
        <Route path="product/:id" element={<Product />}></Route>

        <Route path="adminDashboard" element={<AdminDashboard />}></Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="login" element={<Navigate to={"/"} />}></Route>
        <Route path="signup" element={<Navigate to={"/"} />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="product/:id" element={<Product />}></Route>
      </Route>

      <Route path="mobile" element={<Mobile />}></Route>
      <Route path="laptop" element={<Laptop />}></Route>
      <Route path="shoes" element={<Shoes />}></Route>
      <Route path="sports" element={<Sports />}></Route>
      <Route path="accessories" element={<Accessories />}></Route>
      <Route path="clothing" element={<Clothing />}></Route>

      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);
