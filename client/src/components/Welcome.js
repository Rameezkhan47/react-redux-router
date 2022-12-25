// import { id, firstName, lastName } from "./Login";
import { Header } from "./Header";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Welcome() {
  const[user,setUser]= useState({})
  const [backendData, setBackendData] = useState([{}]);
  const [userData,setUserData] = useState([{}]);
  const [isShown, setIsShown] = useState(false);

  let info = useSelector((state) => state.info.info);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("/api3")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);
  // console.log("backend data in welcome is ", backendData);
  // if (info.length === 0) {
  //   return <Navigate to="/" />;
  // }
  // useEffect(()=>{
  //   fetch("api3")
  //   .then((response) => response.json())
  //   .then((user) => {
  //     console.log(user.data)
  //     setBackendData(user.data)
  //   });

  // },[])

  // useEffect(()=>{
  //    fetch("api2")
  //   .then((response) => response.json())
  //   .then((user) => {
  //     console.log('welcome data',user.data)
  //     setUserData(user.data)
  //   });
  // },[])

  const backendUsers = userData.find(
    (user) => user.username === backendData[0].username && user.password === backendData[0].password
  );

  // console.log('backend users are' , backendUsers)

  // useEffect(() => {
  //    fetch("http://localhost:5000/api2")
  //     .then((response) => response.json())
  //     .then((user) => {
  //       console.log('login data',user.data)
  //       setBackendData(user.data);
  //     });
  // }, []);
useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('user_key'))
  setUser(user)
},[])



  function logout() {
    localStorage.removeItem('user_key')
    // fetch("/api4")
    // info = "";
    navigate("/", { replace: true });
  }
  function clickHandler() {
    setIsShown((current) => !current);

    console.log("user is", user);
  }
  function navigateHandler() {
    navigate("/registered");
  }

  return (
    <>
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
