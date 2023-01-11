import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Header } from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const loggedInUserData = await response.json();
    console.log(loggedInUserData)
    if (loggedInUserData.data) {
      localStorage.setItem("user_key", JSON.stringify(loggedInUserData.data));
      navigate("/welcome");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <Header
          element2={
            <Link to="signup">
              <button className="btn btn-primary btn-sm nav-button">
                Sign up
              </button>
            </Link>
          }
        />
      </nav>

      <form onSubmit={login} className="rounded p-4 p-sm-5 login">
        <h1 className="heading"> Login </h1>

        <div className="form-group">
          <label className="mb-2">Username</label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-div">
          <button type="submit" className="btn btn-primary mt-3 login-button">
            Login
          </button>
          <p className="login-footer">
            not a user?{" "}
            <Link to="signup" className="login-footer">
              click here
            </Link>{" "}
            to register
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
