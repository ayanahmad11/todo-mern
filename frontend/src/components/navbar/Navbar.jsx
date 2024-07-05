import React from 'react'
import { GiNotebook } from "react-icons/gi";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import "./Navbar.css"
const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=> state.isLoggedIn) ;
  const dispatch=useDispatch();
  const logout = ()=>{
      sessionStorage.clear();
      dispatch(authActions.logout());
      navigate("/signin")
  }
  
  console.log(isLoggedIn)
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
          <div className="container">
               <Link className="navbar-brand h1" to="/">
                  <GiNotebook/>Todo
                </Link>
                
                  <button 
                    className="navbar-toggler"
                    type="button"
                      data-bs-toggle="collapse" 
                      data-bs-target="#navbarSupportedContent" 
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >     
                 <span className="navbar-toggler-icon"></span>
                  </button>
                  
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item mx-2 my-2">
                      <Link className="nav-link active" aria-current="page" to="/">
                        Home
                      </Link>
                    </li>
          <li className="nav-item mx-2 my-2 ">
            <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
          </li>  
         
          <li className="nav-item mx-2 my-2 ">
            <Link className="nav-link active" aria-current="page" to="/todo">Todo </Link>
          </li>
          {!isLoggedIn &&( <>
                <li className="nav-item mx-2 my-2 text-center">
                  <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign Up</Link>
                </li>
              
                <li className="nav-item mx-2 my-2 text-center">
                  <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign In</Link>
                </li>
          </>)}
            
          {isLoggedIn &&(<>
                  <li className="nav-item mx-2 my-2 text-center"  onClick={logout}>
                     <Link className="nav-link active btn-nav" aria-current="page" to="#">Log out </Link>
                    
                   </li>
         
          </>) }
         
 
        </ul>
      
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar