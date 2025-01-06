import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  adminLogin,
  setAdminEmail,
  setIsAdminLoggedIn,
} from "../Redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
    setIsSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  const validate = (fields) => {
    const newError = {};
    if (!fields.email) {
      newError["email"] = "Email is required";
    }
    if (!fields.password) {
      newError["password"] = "Password is required";
    }
    return newError;
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:5000/api/adminSignin", values)
        .then((res) => {
          console.log(res);
          dispatch(adminLogin(res.data.token));
          dispatch(setAdminEmail(values.email));
          dispatch(setIsAdminLoggedIn(true));
          toast.success("Successfully Signed in");
          navigate("/adminDashboard");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [isSubmit, errors, values]);
  return (
    <>
      <div className="container">
        <h1>Admin Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Admin Email*</label>
          <input
            type="text"
            placeholder="Enter Admin Email"
            name="email"
            autoComplete="off"
            onChange={handleChange}
          />
          {errors && <span className="error">{errors?.email}</span>}

          <label htmlFor="password">Admin Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Admin Password"
            id="password"
            onChange={handleChange}
          />
          {errors && <span className="error">{errors?.password}</span>}

          <br />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
