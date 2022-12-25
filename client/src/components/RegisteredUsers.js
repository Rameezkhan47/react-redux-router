import { useSelector } from "react-redux";
import { Header } from "./Header";
import { useState, useEffect } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registeredUsers.css";

export function RegisteredUsers() {
  const[userData,setUserData]=useState([{}])
  const [backendData, setBackendData] = useState([{}]);
  useEffect(()=>{
    fetch("api3")
    .then((response) => response.json())
    .then((user) => {
      console.log(user.data)
      setUserData(user.data)
    });

  },[])

  useEffect(() => {
    fetch("http://localhost:5000/api2")
      .then((response) => response.json())
      .then((user) => {
        console.log('login data',user.data)
        setBackendData(user.data);
      });
  }, []);


  const navigate = useNavigate();
  // const registeredUsers = useSelector((state) => state.signup.users);
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

  if (userData.length === 0) {
    return <Navigate to="/" />;
  }
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
