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

    buy(product){
        const { addPhone } = this.props;
        console.debug("buy " + JSON.stringify(product))
        addPhone(product, 1)
    }

    render(){
        return (
            <div className="col-sm-12">
                {this.state.products.map(product => (
                    [
                        <div className="col-sm-4">
                            <div className="card h-align">
                                <img className="card-img-top h-align" style={{ "width": "70%" }} src={"https://cdn0.it4profit.com/s3/isupport-kz/categories/iphone-13.webp"} alt="Card cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title text-h-align">{product.model}</h5>
                                    <p className="card-text text-h-align">{product.desc}</p>
                                    <div className="space-between">
                                        <button className="btn btn-sm btn-success" onClick={this.buy.bind(this, product)}>
                                            <span className="fas fa-cart-arrow-down fa-2x"></span>
                                        </button>
                                        <button className="btn btn-sm btn-danger">
                                            <span className="fas fa-heart fa-2x"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ]))
                }
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
    addPhone: (product, amount) => dispatch(addItem({id: product.id, amount: amount, model: product.model, description: product.desc}))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetAll);
