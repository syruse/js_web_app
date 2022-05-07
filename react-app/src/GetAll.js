import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/user.context";
import { Method, fetch } from "./utils/fetcher"

class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
    }

    componentDidMount(){
        if (!UserContext.currentUser && typeof UserContext.currentUser.token === 'undefined') {
            console.log("GetAll app mounted with empty token")
            this.props.navigate("/login");
        }
        console.log("GetAll app mounted with token", UserContext.currentUser.token)
        fetch("http://localhost:8080/api/phones", UserContext.currentUser.token, Method.GET)
        .then(res=>{
            console.log("GetAll ", res)
            this.setState({products:res.data})
        }).catch(err=>{
            console.error("error ", err)
        })
    }

    componentDidUpdate(){
        console.log("GetAll app updated")
    }

    render(){
        return (
            <div>
              <h3> Products: </h3>
              <br/>
              {this.state.products.map(product=>(
              [<h5>Product {product.name}</h5>,
              <ul> 
                   <li> product id: {product.id} </li>
                   <li> desc: {product.desc} </li>
                   <li> price: {product.price} </li>
              </ul>]))}
            </div>
          );
    }
}

/// wrapper for using hooks for components
function WithNavigate(props) {
    let navigate = useNavigate();
    return <GetAll {...props} navigate={navigate} />
}

export default WithNavigate;