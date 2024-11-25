import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../components/Features/home";
import Login from "../components/auth/login";
import Landing from "../components/Features/landingPage";
import Signup from "../components/auth/signup";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing></Landing>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="signup" element={<Signup></Signup>}></Route>
    </Route>
  )
);
