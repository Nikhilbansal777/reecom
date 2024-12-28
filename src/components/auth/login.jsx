import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { login, setEmail } from "../Redux/reducers/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

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
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:5000/api/signin", values)
        .then((res) => {
          dispatch(login(res.data.token));
          dispatch(setEmail(values.email));

          toast.success("Successfully Logged In");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  }, [isSubmit, errors, values, navigate, dispatch]);

  const validate = (fields) => {
    let tempErrors = {};
    if (!fields.email) {
      tempErrors["email"] = "Email is required";
    }
    if (!fields.password) {
      tempErrors["password"] = "Password is required";
    }
    return tempErrors;
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email*</label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          id="password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
