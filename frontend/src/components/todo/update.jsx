import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  toast } from "react-toastify";

const Update = ({display,update}) => {
  const [fetchTrigger, setFetchTrigger] = useState(false);
  useEffect(()=>{
    setInputs({
      title:update.title,
      body:update.body,
    }) ;
  },[update,fetchTrigger])  

  const [Inputs,setInputs] = useState({
    title:"",
    body:"",
  }) ;
  const change =(e)=>{
      const {name,value} = e.target;
      setInputs({ ...Inputs,[name]: value})
  }
  const submit = async()=>{
    await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`,Inputs).then((response)=>{
       toast.success(response.data.message)
    })
    setFetchTrigger(!fetchTrigger);
    
    display("none")
  }
  // console.log('Display function:', display);
  // console.log('Update object:', update);
  return (
    <div className='p-5 d-flex justify-content-center align-items-center flex-column update'>
            <h3>
                Update Your Task
                <input type='text' className='todo-inputs my-4 w-100 p-3'value={Inputs?.title || ''}name="title"onChange={change}>
                </input>
                <textarea className='todo-inputs w-100 p3 ' value={Inputs?.body || ''}name="body"onChange={change}/>    
                <button className='btn btn-dark my-4 mx-3  ' onClick={submit}> update</button>
                <button className='btn btn-danger my-4 ' onClick={()=>{display("none")}}> close</button>
            </h3>
     </div>
  )
}

export default Update