import React from 'react'
import "./footer.css";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='container-fluid p-3 d-flex justify-content-center align-items-center '>
        <h4>todogist</h4>
        <p className='m-0'>
            &copy;
            Made with <FaHeart/>  by Ayan
        </p>
    </div>
  )
}

export default Footer