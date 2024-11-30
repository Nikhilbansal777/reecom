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
import AddProduct from "../components/Features/addProduct";
import Mobile from "../components/Features/Category/Mobile";
import Laptop from "../components/Features/Category/Laptop";
import Clothing from "../components/Features/Category/Clothing";
import Product from "../components/Features/Product";
import Shoes from "../components/Features/Category/Shoes";
import Sports from "../components/Features/Category/Sports";
import Accessories from "../components/Features/Category/Accessories";

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
      <Route path="addProduct" element={<AddProduct />}></Route>
      <Route path="mobile" element={<Mobile />}></Route>
      <Route path="laptop" element={<Laptop />}></Route>
      <Route path="shoes" element={<Shoes />}></Route>
      <Route path="sports" element={<Sports />}></Route>
      <Route path="accessories" element={<Accessories />}></Route>
      <Route path="clothing" element={<Clothing />}></Route>
      <Route path="product/:id" element={<Product />}></Route>
    </Route>
  )
);
