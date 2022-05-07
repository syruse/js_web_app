import { Component } from "react";
import { UserContext } from "./context/user.context";
import axios from 'axios'

class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
    }

    componentDidMount(){
        console.log("GetAll app mounted with token", UserContext.currentUser.token)
        axios.get("http://localhost:8080/api/phones",
            {
                headers: {
                    'Authorization': `Bearer ${UserContext.currentUser.token}`
                }
            })
        .then(res=>{
            console.log("GetAll ", res.data)
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

export default GetAll;