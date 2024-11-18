import { useState } from "react";
import "../../styles/home.css";

const Home = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    subject: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
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
      console.log("Form is filled and passed validation");
      console.log(values);
      setErrors({});
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!values.firstName) newErrors.firstName = "First name is required";
    if (!values.lastName) newErrors.lastName = "Last name is required";
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!values.contact) newErrors.contact = "Contact is required";
    if (!values.gender) newErrors.gender = "Gender is required";

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
        <label htmlFor="firstName">First Name *</label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          onChange={(e) => handleChange(e)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <label htmlFor="lastName">Last Name*</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          onChange={(e) => handleChange(e)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
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
          placeholder="Enter phone number"
          name="contact"
          onChange={(e) => handleChange(e)}
        />
        {errors.contact && <span className="error">{errors.contact}</span>}
        <label htmlFor="gender">Gender*</label>
        <input
          type="radio"
          placeholder="Enter Gender"
          name="gender"
          onChange={(e) => handleChange(e)}
        />{" "}
        Male
        <input
          type="radio"
          placeholder="Enter Gender"
          name="gender"
          onChange={(e) => handleChange(e)}
        />{" "}
        Female
        <input
          type="radio"
          placeholder="Enter Gender"
          name="gender"
          onChange={(e) => handleChange(e)}
        />{" "}
        Other
        {errors.gender && <span className="error">{errors.gender}</span>}
        <label htmlFor="subject">Subject</label>
        <select name="subject" id="subject" onChange={(e) => handleChange(e)}>
          <option value="math">math</option>
          <option value="physics">physics</option>
          <option value="chemistry">chemistry</option>
        </select>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => handleChange(e)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Home;
