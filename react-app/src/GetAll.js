import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Method, fetch } from "./utils/fetcher";
import { addItem } from "./store/cart/cart-action"

class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
        const unsubscribe = store.subscribe(() =>
            console.debug(store.getState())
        )
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

    buy(productId){
        console.log("buy " + productId)
        store.dispatch(addItem({productId: productId}))
    }

    render(){
        return (
            <div className="row">
                <h2 className="text-center" >Products</h2>
                <table className="table-bordered col-sm-6 col-sm-offset-3">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => (
                            [
                                <tr key={product.id*3    }>
                                    <td key={product.id*4 + 1}> {product.model} </td>
                                    <td key={product.id*4 + 2}> {product.desc} </td>
                                    <td key={product.id*4 + 3}> {product.price} </td>
                                    <td key={product.id*4 + 4}> 
                                            <button className="btn btn-success btn-xs btn-block" onClick={this.buy.bind(this, product.id)}>Buy</button> 
                                    </td>
                                </tr>
                            ]))
                        }
                    </tbody>
                </table>
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