import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from "./context/user.context";
import Get from './Get';
import Create from './Create';
import GetAll from './GetAll';
import Login from './Login';
import Register from './Register';

function App() {
  
  const { currentUser } = useContext(UserContext);
  console.log("currentUser ", JSON.stringify(currentUser));

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<GetAll/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/get" element={<Get/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      { currentUser && currentUser.user &&
        <Link to="/create">Create</Link>
      }
      <br/>
      <Link to="/get">Get</Link><br/>
      <Link to="/">Home</Link><br/>
      <Link to="/login">Login</Link><br/>
    </div>
  );
}

export default App;