

import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./update";
import axios from "axios";


const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "", });
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [Array, setArray] = useState([]);
  const [UpdateArray, setUpdateArray] = useState([]);

  let idRef = sessionStorage.getItem("id");

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
    } else {
      if (idRef) {
        try {
          const response = await axios.post(
            `${window.location.origin}/api/v2/addTask`,
            {
              title: Inputs.title,
              body: Inputs.body,
              id: idRef,
            }
          );
          console.log(response)
          setArray([...Array , Inputs]);  
          setInputs({ title: "", body: "" });
          toast.success("Your Task Is Added");
          setFetchTrigger(!fetchTrigger); // Toggle the fetch trigger state
        } catch (error) {
          console.error("Error adding task:", error);
          toast.error("Failed to add task. Please try again.");
        }
      } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved ! Please SignUp");
      }
    }
  };

  const del = async (Cardid) => {
    setFetchTrigger(!fetchTrigger)
    let id = idRef;
    if (!id) {
      toast.error("Please sign up first.");
      return;
    }

    try {
      await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
        data: { id: id },
      });
      setArray(Array.filter((item) => item._id !== Cardid));
      
      toast.success("Task deleted successfully.");
      setFetchTrigger(!fetchTrigger);

    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };


  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
    setFetchTrigger(!fetchTrigger)
  };
  const update = (index) => {

   setUpdateArray(Array[index]); // Set the task to be updated
   
    // console.log(UpdateArray)
  };
  // const update = (value) => {

  //   toUpdateArray = (Array[value]);
  //   console.log(toUpdateArray)
  // };

  useEffect(() => {
    
    if (idRef) {
      const fetch = async () => {
        try {
          const response = await axios.get(
            `${window.location.origin}/api/v2/getTasks/${idRef}`
          );
          setArray(response.data.list);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to fetch tasks. Please try again.");
        }
      };
      fetch();
    }
  }, [fetchTrigger,idRef]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className=" p-2 todo-inputs"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <div className=" w-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row ">
              {Array &&
                Array.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="todo-update " id="todo-update">
        <div className="container update">
        { < Update display={dis} update={UpdateArray} />}
          {/* {<Update update={toUpdateArray} />} */}
        </div>
      </div>
    </>
  );
};

export default Todo;

