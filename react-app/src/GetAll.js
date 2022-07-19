import { Component } from "react";
import { connect } from "react-redux";
import { Method, fetch } from "./utils/fetcher";
import { addItem } from "./store/cart/cart-action"

class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
    }

    componentDidMount(){
        console.debug("GetAll app mounted")
        fetch("http://localhost:8080/api/phones", undefined, Method.GET)
        .then(res=>{
            console.debug("GetAll ", res)
            this.setState({products:res.data})
        }).catch(err=>{
            console.error("error ", err)
        })
    }

    componentDidUpdate(){
        console.debug("GetAll app updated with current cart" + JSON.stringify(this.props.cart))
    }

    buy(productId){
        const { addPhone } = this.props;
        console.debug("buy " + productId)
        addPhone(productId, 1)
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
/*function WithNavigate(props) {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const addPhone = (productId) => dispatch(addItem({productId: productId}))
    return <GetAll {...props} navigate={navigate} cart={cart} addPhone={addPhone} />
}

export default WithNavigate;*/

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
    addPhone: (productId, amount) => dispatch(addItem({productId: productId, amount: amount}))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetAll);
