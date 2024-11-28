import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState([{ email: "" }, { password: "" }]);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
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
    if (isSubmit && Object.keys(errors.length) === 0) {
      axios
        .post("https:localhost:5000/api/signin", values)
        .then((res) => {
          toast.success("Succesfully Login");
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
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        values.password
      )
    ) {
      newErrors.password = "Password format is invalid";
    }

    return newErrors;
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
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => handleChange(e)}
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
