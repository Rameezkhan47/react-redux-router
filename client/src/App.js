import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Welcome } from "./components/Welcome";
import Login from "./components/Login";
import { RegisteredUsers } from "./components/RegisteredUsers";
import { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  // // useEffect(() => {
  // //   fetch("/api")
  // //     .then((response) => response.json())
  // //     .then((data) => {
  // //       setBackendData(data);
  // //     });
  // // }, []);
  // const body = "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  // const test = {title:"My First Test", body:body, author:"Rameez Khan"}
  // const submitHandler=(e)=>{
  //   e.preventDefault();
  //   fetch("http://localhost:5000/api2", {
  //     method: 'POST',
  //     headers: {"Content-Type": "application/json"},
  //     body:JSON.stringify(test)
  //   })
    
  // }

  return (
    <div>
      {/* {(typeof backendData.users==='undefined')?(<p>Loading</p>):(
        backendData.users.map((user,i)=><p key={i}>{user}</p>)
      )}
      <form onSubmit={submitHandler}><button>submit</button></form> */}

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup  />} />
        <Route exact path='/welcome' element={<Welcome />} />
        <Route exact path='/registered' element={<RegisteredUsers />} />

      </Routes>
    </div>
  );
}

export default App;
