import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../components/Features/home";
import Login from "../components/auth/login";
import Landing from "../components/Features/landingPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing></Landing>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
    </Route>
  )
);
