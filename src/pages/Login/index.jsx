import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import Logo from "../../assets/images/logo.png";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className="formWrap">
        <img src={Logo} className="logo mb-0" />
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center mt-0 mt-md-3">
        <div className="d-flex flex-column mb-2">
          <label className="inputLabel">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="inputBox"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mb-2">
          <label className="inputLabel">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="inputBox"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="align-self-start">
          <Link to="/recovery">
              Forgot Password?
          </Link>
        </div>
        <div className="d-flex justify-content-around my-4 my-md-3">
          <button type="submit" className="submitButton mx-3">
            LogIn
          </button>
          <Link to="/signup" className="registerButton mx-3" >
              Register
          </Link>     
        </div>    
      </form>
  </div>
  )
}

export default Login;
