import { useEffect, useState } from "react";
import "../../styles/signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validate()).length > 0) {
      setErrors(validate());
    } else {
      setIsSubmit(true);
      setErrors({});
    }
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:5000/api/signup", values)
        .then((res) => {
          toast.success("Successfully Registered User");
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit, errors, values, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!values.fullName) newErrors.fullName = "First name is required";
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!values.contact) newErrors.contact = "Contact is required";

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        values.password
      )
    ) {
      newErrors.password = "Password is invalid";
    }
    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Password didnt matched";
    }
    return newErrors;
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">First Name *</label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="fullName"
          onChange={(e) => handleChange(e)}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}

        <label htmlFor="email">Email*</label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          autoComplete="off"
          onChange={(e) => handleChange(e)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <label htmlFor="contact">Contact*</label>
        <input
          type="text"
          placeholder="Enter Phone Number"
          name="contact"
          onChange={(e) => handleChange(e)}
        />
        {errors.contact && <span className="error">{errors.contact}</span>}

        <label htmlFor="password">Password *</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          id="password"
          onChange={(e) => handleChange(e)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
