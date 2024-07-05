import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleButtonClick = () => {
    navigate("/todo"); // Navigate to the "todo" page
  };

  return (
    <div className='home d-flex justify-content-center align-items-center '>
      <div className="container d-flex justify-content-center align-items-center flex-column ">
        <h1 className='text-center'> Organize your <br/> work and life, finally </h1>
        <p>
          Become focused, organized and calm with <br/>
          todo app. The World's Best Task Manager App ;
        </p>
        <button className="home-btn p-2" onClick={handleButtonClick}>
          Make todo list
        </button>
      </div>
    </div>
  );
};

export default Home;