import { Header } from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registeredUsers.css"
export function RegisteredUsers() {

  const [backendData, setBackendData] = useState([{}]);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.length === 0) {
      navigate("/");
    }
  }, [navigate]);



  useEffect(() => {
    fetch("http://localhost:5000/signup")
      .then((response) => response.json())
      .then((user) => {
        console.log('login data',user.data)
        setBackendData(user.data);
      });
  }, []);


  const listItems = backendData.map((d, index) => (
    <div className="container text-center" key={index}>
      <div className="row row-cols-4">
        <div className="col">User {index + 1}</div>
        <div className="col">{d.firstname}</div>
        <div className="col">{d.lastname}</div>
        <div className="col">{d.username}</div>
      </div>
    </div>
  ));


  const profileHandler = () => {
    navigate("/welcome", { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <Header
          element2={
            <button
              onClick={profileHandler}
              className="btn btn-primary btn-sm nav-button"
            >
              Profile
            </button>
          }
        />
      </nav>

      <div id="container" className="container text-center">
        <div className="row row-cols-4">
          <div className="col">
            <b>S.no</b>
          </div>
          <div className="col">
            <b>First Name</b>
          </div>
          <div className="col">
            <b>Last Name</b>
          </div>
          <div className="col">
            <b>Username</b>
          </div>
        </div>
      </div>
      <div>{listItems}</div>

    </>
  );
}
