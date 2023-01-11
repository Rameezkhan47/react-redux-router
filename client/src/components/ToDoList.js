import Button from './UI/Button/Button'
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ToDoList = (props) => {
    const[todo, setTodo] = useState("")

    async function  todoHandler ()  {
        const response = await fetch("http://localhost:5000/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({todo }),
          }); }


    return(

      <form onSubmit={todoHandler} className="rounded p-4 p-sm-2 todo">
        <div className="form-group">
          <label className="sm-5">Add a note</label>
          <textarea rows="3" cols="30"
            className="form-control mb-2"
            name="todo"
            value={todo}
            type="text"
            required
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <Button>Add todo</Button>
      </form>

    )
}

export default ToDoList;