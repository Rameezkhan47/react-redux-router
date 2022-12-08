// import { id, firstName, lastName } from "./Login";
import { Header } from "./Header";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Welcome() {
  const [isShown, setIsShown] = useState(false);
  let info = useSelector((state) => state.info.info);
  const navigate = useNavigate();

  if (info.length === 0) {
    return <Navigate to="/" />;
  }

  function logout() {
    info = "";
    navigate("/", { replace: true });
  }
  function clickHandler() {
    setIsShown((current) => !current);
    console.log("info is", info);
  }
  function navigateHandler() {
    navigate("/registered");
  }

  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
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
        <h1>Welcome {info.firstname}</h1>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button onClick={clickHandler} class="btn btn-primary" type="button">
            User Info
          </button>
          <button
            onClick={navigateHandler}
            class="btn btn-success reg-button"
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
                <td>{info.firstname}</td>
              </tr>
              <tr>
                <td>
                  <b>Last Name</b>
                </td>
                <td>{info.lastname}</td>
              </tr>
              <tr>
                <td>
                  <b>Username</b>
                </td>
                <td>{info.username}</td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
