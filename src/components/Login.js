import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { credentials } from '../App';
import "../App.css";
import { Input } from "./Input";
import { Header } from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { signupActions } from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "./login.css";

// export var id = ''
// export var firstName = ''
// export var lastName = ''
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function onchange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const users = useSelector((state) => state.signup.users);
  const payload = users.find(
    (user) => user.username === username && user.password === password
  );
  const dispatch = useDispatch();
  function login(e) {
    e.preventDefault();
    console.log(payload);

    if (payload) {
      console.log("payload is", payload);
      dispatch(signupActions.info(payload));
      // console.log(dispatch(signupActions.login(username)))
      dispatch(signupActions.login(username));

      navigate("/welcome");
    } else {
      alert("incorrect username or password");
    }

    // for (let i = 0; i < credentials.length; i++) {
    //     if (credentials[i].username === username && credentials[i].password === password) {
    //         id = username;
    //         firstName = credentials[i].firstname;
    //         lastName = credentials[i].lastname;
    //         navigate('/welcome');
    //         setUsername('');
    //         setPassword('');
    //         return true;
    //     }
    // }
    // id = '';
    // firstName = '';
    // lastName = '';
    // alert('username or password is incorrect');
  }

  return (
    <>
    <nav class="navbar navbar-dark bg-dark">
    <Header
      
      element2={
        <Link to="signup">
          <button className="btn btn-primary btn-sm nav-button">Sign up</button>
        </Link>
      }
    />
</nav>

      <form onSubmit={login} className="rounded p-4 p-sm-5">
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
