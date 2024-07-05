import React from 'react'
import "./signup.css";
import HeadingComp from './HeadingComp';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const history =  useNavigate();
    const [Inputs,setInputs] = useState({
        email: "",
        username : "",
        password : "",
    })
    const change = (e) =>{
        const {name,value} = e.target;
        setInputs({...Inputs,[name]: value});
    }
    const submit = async(e) =>{
       e.preventDefault();
      
       await axios.post (`${window.location.origin}/api/v1/register`,Inputs)
       .then((response) => {
            if(response.data.message === "User Already exists")
            alert(response.data.message);
            else{
                alert(response.data.message);
                setInputs({
                    email: "",
                    username : "",
                    password : "",
                   }) 
                   history("/signin")
            }
           
       })
      
    }
  return (
    <div className='signup'>

        <div className='container'>
                <div className='row'>
                        <div className='col-lg-8 column d-flex justify-content-center align-items-center ' >
                            <div className='d-flex flex-column w-100 p-5'>
                                <input 
                                className='p-2 my-3 input-signup '
                                type="email" 
                                name = "email" 
                                placeholder= "Enter your Email" 
                                onChange={change}
                                value={Inputs.email}
                                  />

                                 <input 
                                className='p-2 my-3 input-signup'
                                type="username" 
                                name = "username" 
                                placeholder= "Enter your username" 
                                onChange={change}
                                value={Inputs.username}
                                 />
                                 <input 
                                className='p-2 my-3 input-signup'
                                type="password" 
                                placeholder= "Enter your password" 
                                name = "password" 
                                onChange={change}
                                 value={Inputs.password}
                                 />

                                <button className='btn-signup p-2' onClick={submit}>
                                    Signup
                                </button>
                                
                            </div>
            
                        </div>
                        <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center ' >
                         <HeadingComp first="Sign" second="up"/>
    
                        </div>
                </div>
        </div>
    </div>
  
    )
}

export default Signup