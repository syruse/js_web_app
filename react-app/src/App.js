import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux'
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
  const store = useSelector((state) => state)
  console.debug("cart ", store.cart);

  const [isCartOpened, openCart] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-inverse col-sm-6 col-sm-offset-2">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand fas fa-home fa-sm" to="/"> Home </Link>
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
        <button type="button" className="btn btn-success col-sm-1" onClick={() => { openCart(true) }}>
            <span className="fas fa-shopping-cart fa-2x"></span>
            <span className="p-1">&nbsp;&nbsp;&nbsp;</span>
            <span className="badge badge-light">{store.cart.length}</span>
        </button>
      </div>
      <div className="col-sm-8 col-sm-offset-4">
        {isCartOpened &&
          <div className="modal show" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close fas fa-window-close" data-dismiss="modal" onClick={() => { openCart(false) }} ></button>
                  <h4 className="modal-title">Cart</h4>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <h2 className="text-center" >Products</h2>
                    <table className="table-bordered col-sm-6 col-sm-offset-3">
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.cart.map(product => (
                          [
                            <tr key={product.id * 5}>
                              <td key={product.id * 5 + 1}> {product.model} </td>
                              <td key={product.id * 5 + 2}> {product.desc}  </td>
                              <td key={product.id * 5 + 3}> {product.price} </td>
                              <td key={product.id * 5 + 4}> {product.amount} </td>
                            </tr>
                          ]))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success col-sm-4 col-sm-offset-4" data-dismiss="modal" onClick={() => {
                    console.debug("purchased"); openCart(false)
                  }} >Buy</button>
                </div>
              </div>
            </div>
          </div>
        }
        <Routes>
          <Route exact path="/" element={<GetAll />} />
          <Route path="/create" element={<Create />} />
          <Route path="/get" element={<Get />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="footer" >
        <div id="chat" className="collapse panel panel-success">
          <div className="panel-heading">Chat with consultant</div>
          <div className="panel-body"> <Chat /></div>
        </div>
        <div className="bottom-left">
          <button className="btn btn-primary" data-toggle="collapse" data-target="#chat">
            <i>chat with consultant</i>
            <span className="p-1">&nbsp;&nbsp;&nbsp;</span>
            <span className="fas fa-comment-dots fa-2x"></span></button>
        </div>
      </div>
    </div>
  );
}

export default App;