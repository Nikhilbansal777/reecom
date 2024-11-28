import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../components/Features/home";
import Login from "../components/auth/login";
import Landing from "../components/Features/landingPage";
import Signup from "../components/auth/signup";
import Admin from "../components/Features/admin";
import Profile from "../components/Features/profile";
import Orders from "../components/Features/orders";
import Cart from "../components/Features/cart";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing></Landing>}>
      <Route index element={<Home />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="admin" element={<Admin />}></Route>
      <Route path="profile" element={<Profile />}></Route>
      <Route path="orders" element={<Orders />}></Route>
      <Route path="cart" element={<Cart />}></Route>
    </Route>
  )
);
