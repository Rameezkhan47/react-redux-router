// import { id, firstName, lastName } from "./Login";

import Card from "./UI/Card/Card";
import Button from "./UI/Button/Button";
import { Header } from "./Header";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoList from "./ToDoList";
const { v4: uuid } = require("uuid"); //For generating ID's

export function Welcome() {
  const [user, setUser] = useState({});
  const [usernameToDo, setUsernameToDo] = useState([])


  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

 useEffect(() => {
  let interval = setInterval(() => {
     const user = JSON.parse(localStorage.getItem("user_key"));
  // console.log('user is', user)
  // console.log('useEffect in welcome')
  fetch('/todolist', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  data: user}),
  }).then(response=>response.json())
  .then((users)=>{setUsernameToDo(users.data)})
//  console.log(usernameToDo)
    
  }, 500);
  return ()=> clearInterval(interval)
 

 }, [])
 


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_key"));
    setUser(user);
  }, []);
  useEffect(() => {
    if (localStorage.length === 0) {
      navigate("/");
    }
  }, []);

  function logout() {
    localStorage.removeItem("user_key");
    navigate("/", { replace: true });
  }
  function clickHandler() {
    setIsShown((current) => !current);

    console.log("user is", user);
  }
  function navigateHandler() {
    navigate("/registered");
  }
  const [note, setNote] = useState("");
  const [contain, setContain] = useState("");

  const[todo, setTodo] = useState("")
  async function  todoHandler (e)  {
    e.preventDefault()
    console.log(user.username)
    const response = await fetch("/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({todo, user }),
      })
      console.log(()=>usernameToDo)
      //  setContain(prevContain=>{return[
      // usernameToDo.map((data)=><li>{(data.content)}</li>)
      // ]})
setTodo("")

}
const todoDisplayHandler = ()=>{
  return(
    usernameToDo.map((data)=>console.log(data.content))
  )
  // console.log('username todo', usernameToDo[0].content)
 }
 const click = () => {
  console.log(usernameToDo)
 }

  return (
    <>
    <button onClick={click}>click</button>
      <nav className="navbar navbar-dark bg-dark">
        <Header
          element2={
            <button
              onClick={logout}
              className="btn btn-primary btn-sm nav-button"
            >
              Logout
            </button>
          }
        />
      </nav>

      <div className="details">
        <h1>Welcome</h1>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            onClick={clickHandler}
            className="btn btn-primary"
            type="button"
          >
            User Info
          </button>
          <button
            onClick={navigateHandler}
            className="btn btn-success reg-button"
            type="button"
          >
            Registered Users
          </button>
        </div>
        <form onSubmit={todoHandler} className="rounded p-4 p-sm-2 todo">
        <div className="form-group">
          <label className="sm-5">Add a note</label>
          <textarea rows="3" cols="30"
            className="form-control mb-2"
            name="todo"
            value={todo}
            type="text"
            required
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <Button type="submit">Add todo</Button>
      </form>

        {/* <form onSubmit={todoHandler} className="rounded p-4 p-sm-2 todo">
          <div className="form-group">
            <label className="sm-5">Add a note</label>
            <textarea
              rows="3"
              cols="30"
              className="form-control mb-2"
              name="todo"
              value={note}
              type="text"
              required
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <Button type="submit">Add todo</Button>
          <Button onClick={deleteHandler}>Delete todo</Button>
        </form> */}

          <ul>
          {contain}
          </ul>

        {isShown && (
          <div>
            {" "}
            <h2>User Information</h2>
            <table>
              <tr>
                <td>
                  <b>First Name</b>
                </td>
                <td>{user.firstname}</td>
              </tr>
              <tr>
                <td>
                  <b>Last Name</b>
                </td>
                <td>{user.lastname}</td>
              </tr>
              <tr>
                <td>
                  <b>Username</b>
                </td>
                <td>{user.username}</td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
