import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Method, fetch } from "./utils/fetcher";

class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
    }

    componentDidMount(){
        console.log("GetAll app mounted")
        fetch("http://localhost:8080/api/phones", undefined, Method.GET)
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
              [<h5>Product {product.model}</h5>,
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