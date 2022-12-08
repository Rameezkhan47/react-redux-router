import { useSelector } from "react-redux";
import { Header } from "./Header";
import { useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registeredUsers.css";

export function RegisteredUsers() {
  const navigate = useNavigate();
  const registeredUsers = useSelector((state) => state.signup.users);
  const listItems = registeredUsers.map((d, index) => (
    <div class="container text-center" key={index}>
      <div class="row row-cols-4">
        <div class="col">User {index + 1}</div>
        <div class="col">{d.firstname}</div>
        <div class="col">{d.lastname}</div>
        <div class="col">{d.username}</div>
      </div>
    </div>
  ));

  if (listItems.length === 0) {
    return <Navigate to="/" />;
  }
  const profileHandler = () => {
    navigate("/welcome", { replace: true });
  };

  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
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

      <div id="container" class="container text-center">
        <div class="row row-cols-4">
          <div class="col">
            <b>S.no</b>
          </div>
          <div class="col">
            <b>First Name</b>
          </div>
          <div class="col">
            <b>Last Name</b>
          </div>
          <div class="col">
            <b>Username</b>
          </div>
        </div>
      </div>
      <div>{listItems}</div>

    </>
  );
}
