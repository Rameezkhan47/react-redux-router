import React, { useState } from "react";
import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function signup(e) {
    e.preventDefault();

    fetch("http://localhost:5000/signup", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({ firstname, lastname, username, password })
    }).then((response) => response.json())
    .then((user) => {
      alert(user.message)
      
    });



    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <Header
          element2={
            <Link to="/">
              <button className="btn btn-primary btn-sm nav-button">
                Login
              </button>
            </Link>
          }
        />
      </nav>

      <form onSubmit={signup} className="rounded p-4 p-sm-5 signup">
        <h1 className="heading"> Signup </h1>

        <div className="form-group">
          <label className="mb-2">First Name</label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="mb-2">Last Name</label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="mb-2">Username</label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="mb-2">Password</label>
          <input
            className="form-control mb-2"
            name="password"
            type="password"
            label="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-div">
          <button type="submit" className="btn btn-primary mt-3 login-button">
            Signup
          </button>
          <p className="login-footer">
            already a user?{" "}
            <Link to="/" className="login-footer">
              click here
            </Link>{" "}
            to login
          </p>
        </div>
      </form>
    </>
  );
}
