import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Welcome } from './components/Welcome';
import  Login  from './components/Login';
import { RegisteredUsers } from './components/RegisteredUsers';

// export var credentials=[];

function App() {

  return (
    <div>


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
