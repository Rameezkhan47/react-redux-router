import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { signupActions } from "../store/index";
import { Input } from "./Input";
// import { credentials } from "../App";
import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form } from "react-bootstrap";
// import { Button } from "react-bootstrap";



export function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.signup.users);

  function onchange(e) {
    if (e.target.name === "firstname") {
      setFirstname(e.target.value);
    } else if (e.target.name === "lastname") {
      setLastname(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }
  const validator = users.find((user) => user.username === username);

  function signup(e) {
    e.preventDefault();
    console.log('validator is', validator)
    if (!validator){    dispatch(signupActions.signup({ firstname, lastname, username, password }));
    console.log('signup users are', users)

}
else(alert('username already exists'))
    // credentials.push({ firstname, lastname, username, password });
    //alert('New user created')
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
    // console.log(credentials);
    navigate("/");
  }







  return (
    <>
         <Header
        element2={
          <Link to="/">
            <button>Login</button>
          </Link>
        }
      />


 
      <div className="signin">
        <form className="card">
          <Input
            label="First Name"
            type="text"
            name="firstname"
            change={onchange}
            val={firstname}
          />
          <Input
            label="Second Name"
            type="text"
            name="lastname"
            change={onchange}
            val={lastname}
          />
          <Input
            label="UserName"
            type="text"
            name="username"
            change={onchange}
            val={username}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            change={onchange}
            val={password}
          />
          <button onClick={signup}>Sign Up</button>
        </form>
      </div>
    </>
  );
}
