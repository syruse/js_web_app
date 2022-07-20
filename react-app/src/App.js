import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from "./context/user.context";
import Get from './Get';
import Create from './Create';
import GetAll from './GetAll';
import Login from './Login';
import Register from './Register';
import Chat from './Chat';

function App() {
  
  const { currentUser } = useContext(UserContext);
  console.debug("currentUser ", JSON.stringify(currentUser));

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-inverse col-sm-6 col-sm-offset-2">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Home</Link>
            </div>
            <ul className="nav navbar-nav">
              {currentUser && currentUser.user && currentUser.user.is_admin &&
                <li><Link to="/create">Create</Link></li>
              }
              <li><Link to="/get">Get</Link></li>
            </ul>
          </div>
        </nav>
        <div className="col-sm-2"><Login /></div>
        <button type="button" className="btn btn-success col-sm-1">
          <div className="container-fluid">
            <span className="fa fa-cart-plus fa-2x"></span>
            <span className="badge badge-light">4</span>
          </div>
        </button>
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<GetAll />} />
          <Route path="/create" element={<Create />} />
          <Route path="/get" element={<Get />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="footer panel panel-success" >
        <div className="panel-heading">Chat with consultant</div>
        <div className="panel-body"> <Chat /></div>
      </div>
    </div>
  );
}

export default App;