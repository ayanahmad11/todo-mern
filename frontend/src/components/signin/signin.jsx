import React, { useState } from 'react';
import axios from 'axios';
import HeadingComp from '/Users/ayanahmed/Desktop/TODO_mern/frontend/src/components/signup/HeadingComp.jsx';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import "./signin.css";

const Signin = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); // Fixed useNavigate hook
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`${window.location.origin}/api/v1/signin`, inputs);
      sessionStorage.setItem("id",response.data.userWithoutPassword._id)
      
    //   console.log(response.data.userWithoutPassword._id )
      if (response.data.message === "logged in successfully") {
        
        setMessage(response.data.message);
        dispatch(authActions.login())
        navigate("/todo"); // Redirect to the desired route after successful login
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}

              <form onSubmit={submit} className="w-100 d-flex flex-column  w-100 p-3">
                <input
                  className="p-2 my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={inputs.email}
                  onChange={change}
                  disabled={loading}
                  autoComplete="email"
                />
                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={inputs.password}
                  onChange={change}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button className="btn-signup p-2" type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

