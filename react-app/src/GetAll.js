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