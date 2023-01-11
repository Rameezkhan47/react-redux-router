import Button from "./UI/Button/Button";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Welcome() {
  const [user, setUser] = useState({});
  const [contain, setContain] = useState("");
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_key"));
    setUser(user);
  }, []);
  useEffect(() => {
    if (localStorage.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem("user_key");
    navigate("/", { replace: true });
  }
  function clickHandler() {
    setIsShown((current) => !current);
  }
  function navigateHandler() {
    navigate("/registered");
  }

  const [todo, setTodo] = useState("");
  async function todoHandler(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user_key"));

    console.log(user.username);
    const response = await fetch("/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo, user }),
    });
    const todoResponse = await response.json()
    console.log('todo response is', todoResponse)

    setTodo("");
    const fetchData = async () => {
      const response = await fetch("/todolist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: user,
        }),
      });
      const todoList = await response.json();
      console.log("welcome user.id is", todoList.data._id);
      setContain(
        todoList.data.map((element) => {
          return <li key={element._id}>{element.content}</li>;
        })
      );
    };
    fetchData();
  }
  function displayTodo() {
    // setTodoShown((current) => !current);
    const fetchData = async () => {
      const response = await fetch("/todolist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: user,
        }),
      });
      const welcomeUserData = await response.json();
      console.log("welcome user data is", welcomeUserData);
      setContain(
        welcomeUserData.data.map((element) => {
          return <li key={element._id}>{element.content}</li>;
        })
      );
    };
    fetchData();
  }

  function deleteTodo() {
    // setTodoShown((current) => !current);
    const fetchData = async () => {
      const response = await fetch("/todolist", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: user,
        }),
      });
      const welcomeUserData = await response.json();
      console.log(welcomeUserData)
      displayTodo();
    };
    fetchData();
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
        <form onSubmit={todoHandler} className="rounded p-4 p-sm-2 todo">
          <div className="form-group">
            <label className="sm-5">Add a note</label>
            <textarea
              rows="3"
              cols="30"
              className="form-control mb-2"
              name="todo"
              value={todo}
              type="text"
              required
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <Button type="submit">Add todo</Button>
          <Button onClick={displayTodo}>Display todo</Button>
          <Button onClick={deleteTodo}>Delete todo</Button>
        </form>

        <ul>{contain}</ul>

        {isShown && (
          <div>
            {" "}
            <h2>User Information</h2>
            <table>
              <tbody>
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
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
