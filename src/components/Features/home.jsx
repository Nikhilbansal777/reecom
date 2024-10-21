import { useState } from 'react';
import '../../styles/home.css';

const Home = () => {

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    subject: ""
  })
  const handleChange = (e)=>{
    setValues({
      ...values,
    [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(values);
    
  }
  return <div className="container">
    <h1>Form in React</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name *</label>
      <input type="text" placeholder="Enter First Name" name="firstName" required onChange={(e)=> handleChange(e)}/>

      <label htmlFor="lastName">Last Name*</label>
      <input type="text" placeholder="Enter Last Name" name="lastName"  required onChange={(e)=> handleChange(e)}/>
      
      <label htmlFor="email">Email*</label>
      <input type="email" placeholder="Enter Email" name="email"  required onChange={(e)=> handleChange(e)}/>

      <label htmlFor="contact">Contact*</label>
      <input type="text" placeholder="Enter phone number" name="contact" required  onChange={(e)=> handleChange(e)}/>

      <label htmlFor="gender">Gender*</label>
      <input type="radio" placeholder="Enter Gender" name="gender"  required onChange={(e)=> handleChange(e)}/> Male
      <input type="radio" placeholder="Enter Gender" name="gender" required onChange={(e)=> handleChange(e)}/> Female
      <input type="radio" placeholder="Enter Gender" name="gender" required onChange={(e)=> handleChange(e)}/> Other

      <label htmlFor="subject">Subject</label>
      <select name="subject" id="subject"  onChange={(e)=> handleChange(e)}>
        <option value="math">math</option>
        <option value="physics">physics</option>
        <option value="chemistry">chemistry</option>
      </select>


    <button>
      Submit
    </button>
    </form>
  </div>
};

export default Home;
