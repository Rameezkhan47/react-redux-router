// import { id, firstName, lastName } from "./Login";
import { Header } from "./Header";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import './welcome.css'



export function Welcome() {
  const [isShown, setIsShown] = useState(false);
    let info = useSelector(state => state.info.info)
  const navigate = useNavigate();

  if (info.length === 0) {
    return <Navigate to="/" />;
  }

  function logout() {
    info='';
    navigate("/", { replace: true });

  }
  function clickHandler() {
    setIsShown(current => !current);
    console.log('info is',info)
  }
  function navigateHandler() {
    navigate("/registered")
  }

  return (
    <>
      <Header element1="id" element2={<p onClick={logout}>Logout</p>} />
      <div className="details">
        <h1>Welcome {info.firstname}</h1>
        <div className="d-grid gap-2">
        <button  onClick={clickHandler}>User Info</button>
        <button onClick={navigateHandler}>Registered Users</button>
        <div className="d-grid gap-2">

</div>

        </div>


        {isShown && (
          <div>
            {" "}
            <h2>User Information</h2>
            <table>
                <tr>
                   <td><b>First Name</b></td> 
                   <td>{info.firstname}</td>
                </tr>
                <tr>
                   <td><b>Last Name</b></td> 
                   <td>{info.lastname}</td>
                </tr>
                <tr>
                   <td><b>Username</b></td> 
                   <td>{info.username}</td>
                </tr>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
